pub struct AudioMixer {
    channels: Vec<f32>,
}

impl AudioMixer {
    pub fn new(channels: usize) -> Self {
        Self {
            channels: vec![0.0; channels],
        }
    }

    pub fn mix(&mut self, samples: &[f32]) -> Vec<f32> {
        samples.to_vec()
    }
}
