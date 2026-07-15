use crate::{PluginError, PluginManifest};
use wasmtime::{Engine, Instance, Module, Store, Linker, Memory, TypedFunc};
use wasi_common::WasiCtx;

pub struct PluginRuntime {
    engine: Engine,
    instances: std::collections::HashMap<String, PluginInstance>,
}

struct PluginInstance {
    store: Store<WasiCtx>,
    instance: Instance,
    memory: Memory,
}

impl PluginRuntime {
    pub fn new() -> Result<Self, PluginError> {
        let engine = Engine::default();
        Ok(Self {
            engine,
            instances: std::collections::HashMap::new(),
        })
    }

    pub async fn load_module(
        &mut self,
        path: &str,
        manifest: &PluginManifest,
    ) -> Result<(), PluginError> {
        let wasm_path = std::path::Path::new(path).join(&manifest.main);
        let wasm_bytes = std::fs::read(&wasm_path)
            .map_err(|e| PluginError::Load(format!("Cannot read WASM file: {e}")))?;

        let module = Module::from_binary(&self.engine, &wasm_bytes)
            .map_err(|e| PluginError::Load(format!("Invalid WASM module: {e}")))?;

        let wasi_ctx = WasiCtx::default();
        let mut store = Store::new(&self.engine, wasi_ctx);

        let mut linker = Linker::new(&self.engine);
        wasi_common::sync::add_to_linker(&mut linker, |s| s)
            .map_err(|e| PluginError::Runtime(format!("Linker error: {e}")))?;

        let instance = linker
            .instantiate(&mut store, &module)
            .map_err(|e| PluginError::Runtime(format!("Instantiation error: {e}")))?;

        let memory = instance
            .get_memory(&mut store, "memory")
            .ok_or_else(|| PluginError::Runtime("No memory export".into()))?;

        self.instances.insert(
            manifest.name.clone(),
            PluginInstance {
                store,
                instance,
                memory,
            },
        );

        Ok(())
    }

    pub fn get_instance(
        &self,
        plugin_name: &str,
    ) -> Option<(&PluginInstance, &Engine)> {
        self.instances
            .get(plugin_name)
            .map(|inst| (inst, &self.engine))
    }
}
