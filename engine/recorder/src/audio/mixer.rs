pub struct AudioMixer { channels: usize }
impl AudioMixer {
    pub fn new(channels: usize) -> Self { Self { channels } }
    pub fn mix(&mut self, samples: &[f32]) -> Vec<f32> { samples.to_vec() }
}
