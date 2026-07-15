pub mod runtime;
pub mod wasm_bridge;
pub mod sandbox;

use serde::{Deserialize, Serialize};
use crate::runtime::PluginRuntime;
use crate::wasm_bridge::WasmBridge;
use crate::sandbox::Sandbox;

#[derive(Debug, thiserror::Error)]
pub enum PluginError {
    #[error("Plugin not found: {0}")]
    NotFound(String),
    #[error("Plugin load error: {0}")]
    Load(String),
    #[error("Permission denied: {0}")]
    PermissionDenied(String),
    #[error("Runtime error: {0}")]
    Runtime(String),
    #[error("Sandbox error: {0}")]
    Sandbox(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PluginManifest {
    pub name: String,
    pub version: String,
    pub description: String,
    pub author: String,
    pub permissions: Vec<String>,
    pub main: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PluginPermission {
    pub scope: String,
    pub granted: bool,
}

pub struct PluginManager {
    runtime: PluginRuntime,
    bridge: WasmBridge,
    sandbox: Sandbox,
    loaded_plugins: std::collections::HashMap<String, PluginManifest>,
}

impl PluginManager {
    pub fn new() -> Result<Self, PluginError> {
        Ok(Self {
            runtime: PluginRuntime::new()?,
            bridge: WasmBridge::new(),
            sandbox: Sandbox::new(),
            loaded_plugins: std::collections::HashMap::new(),
        })
    }

    pub async fn load_plugin(
        &mut self,
        path: &str,
    ) -> Result<String, PluginError> {
        // Valida o manifesto
        let manifest = self.read_manifest(path)?;

        // Verifica permissões e apresenta ao usuário
        self.sandbox.validate_permissions(&manifest.permissions)?;

        // Carrega o módulo WASM
        self.runtime.load_module(path, &manifest).await?;

        let plugin_id = uuid::Uuid::new_v4().to_string();
        self.loaded_plugins.insert(plugin_id.clone(), manifest);

        Ok(plugin_id)
    }

    pub fn unload_plugin(&mut self, plugin_id: &str) -> Result<(), PluginError> {
        self.loaded_plugins
            .remove(plugin_id)
            .ok_or_else(|| PluginError::NotFound(plugin_id.to_string()))?;
        Ok(())
    }

    pub async fn call_plugin_function(
        &self,
        plugin_id: &str,
        function: &str,
        args: &[u8],
    ) -> Result<Vec<u8>, PluginError> {
        let manifest = self
            .loaded_plugins
            .get(plugin_id)
            .ok_or_else(|| PluginError::NotFound(plugin_id.to_string()))?;

        self.bridge
            .call(&self.runtime, plugin_id, function, args)
            .await
    }

    pub fn list_plugins(&self) -> Vec<(String, PluginManifest)> {
        self.loaded_plugins
            .iter()
            .map(|(id, m)| (id.clone(), m.clone()))
            .collect()
    }

    fn read_manifest(&self, path: &str) -> Result<PluginManifest, PluginError> {
        // Lê o plugin.json do diretório do plugin
        let manifest_path = std::path::Path::new(path).join("plugin.json");
        let content = std::fs::read_to_string(&manifest_path)
            .map_err(|e| PluginError::Load(format!("Cannot read manifest: {e}")))?;
        serde_json::from_str(&content)
            .map_err(|e| PluginError::Load(format!("Invalid manifest: {e}")))
    }
      }
