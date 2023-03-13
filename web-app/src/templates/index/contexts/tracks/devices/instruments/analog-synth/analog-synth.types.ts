import { AnalogSynthAmplitudeEnvelopeSettings } from "./parts/amplitude-envelope";
import { AnalogSynthFilterSettings } from "./parts/filter";
import { AnalogSynthOscillatorsSettings } from "./parts/oscillators";

export interface AnalogSynthOptions {
  oscillators: AnalogSynthOscillatorsSettings;
  amplitudeEnvelope: AnalogSynthAmplitudeEnvelopeSettings;
  filter: AnalogSynthFilterSettings;
}
