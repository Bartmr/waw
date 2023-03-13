import {
  AudioEffect,
  AudioEffectBox,
  AudioEffectType,
} from "../audio-effects.types";

export interface Compressor extends AudioEffect {}

export interface CompressorBox extends AudioEffectBox {
  type: AudioEffectType.Compressor;
  audioEffectRef: AudioEffect;
}
