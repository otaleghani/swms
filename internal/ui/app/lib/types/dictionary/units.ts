// Todo: understand if you actually need this one or not.


/** Every key is the ie of the unit in the backend */
export interface DictUnits {
  si_mm: DictUnit;
  si_m: DictUnit;
  si_km: DictUnit;
  us_thou: DictUnit;
  us_inch: DictUnit;
  us_foot: DictUnit;
  us_yard: DictUnit;
  si_mg: DictUnit;
  si_g: DictUnit;
  si_kg: DictUnit;
  si_t: DictUnit;
  us_oz: DictUnit;
  us_lb: DictUnit;
  us_ton: DictUnit;
}

export interface DictUnit {
  name: string;
  id: string;

  // Todo: handle convertion
  // I could handle convertion between different units
  // by having them hold the convertion value to a unique base
  // lets say for weight I use the smallest unit, so grams
  //
  // I can say that gram has a ratio of 1
  // In kg I could have 1000 because 1 kg is equal to 1000 grams
  //
  // To convert a value I could first off convert the first one to grams
  // by dividing it by the ratio and then multiplying it by the new unit.
  //
}
