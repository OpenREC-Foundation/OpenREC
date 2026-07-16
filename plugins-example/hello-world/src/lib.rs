#[no_mangle] pub extern "C" fn init() {}
#[no_mangle] pub extern "C" fn execute(_ptr: *const u8, _len: usize) -> i32 { 0 }
#[no_mangle] pub extern "C" fn destroy() {}
