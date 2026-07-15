use crate::{PluginError, runtime::PluginRuntime};

pub struct WasmBridge;

impl WasmBridge {
    pub fn new() -> Self {
        Self
    }

    pub async fn call(
        &self,
        runtime: &PluginRuntime,
        plugin_name: &str,
        function: &str,
        args: &[u8],
    ) -> Result<Vec<u8>, PluginError> {
        let (instance, engine) = runtime
            .get_instance(plugin_name)
            .ok_or_else(|| PluginError::NotFound(plugin_name.to_string()))?;

        // Copia dados para a memória do WASM
        let input_ptr = self.copy_data_to_wasm(instance, args)?;

        // Chama a função exportada
        let func = instance
            .instance
            .get_typed_func::<(i32, i32), i32>(&instance.store, function)
            .map_err(|e| PluginError::Runtime(format!("Function not found: {e}")))?;

        let output_ptr = func
            .call(&mut instance.store, (input_ptr, args.len() as i32))
            .map_err(|e| PluginError::Runtime(format!("Call error: {e}")))?;

        // Lê o resultado
        self.read_data_from_wasm(instance, output_ptr)
    }

    fn copy_data_to_wasm(
        &self,
        instance: &crate::runtime::PluginInstance,
        data: &[u8],
    ) -> Result<i32, PluginError> {
        // Aloca memória no módulo WASM e copia os dados
        Ok(0)
    }

    fn read_data_from_wasm(
        &self,
        instance: &crate::runtime::PluginInstance,
        _ptr: i32,
    ) -> Result<Vec<u8>, PluginError> {
        // Lê dados da memória WASM
        Ok(vec![])
    }
}
