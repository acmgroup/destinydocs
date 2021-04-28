export default {}

/**
 * Converts seconds into HH:MM:SS
 *
 * @param seconds
 * @returns {string}
 */
export const secsToHMS = (seconds) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0')
  const m = Math.floor((seconds / 60) % 60).toString().padStart(2, '0')
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${h}:${m}:${s}`
}

/**
 * Returns a specified sensors value from the sensors array in telemetry data.
 *
 * @param name String
 * @param telemetry Object
 *
 * @returns mixed
 */
export const fromTelemetry = (name, telemetry) => {
  const sensorIdx = telemetry.sensors.findIndex((sensor) => {
    return sensor[0] === name
  })
  if (sensorIdx === -1) {
    return null
  } else {
    return {
      local_time: telemetry.gps.local_time,
      value: telemetry.sensors[sensorIdx][1]
    }
  }
}

// Below is a list of all the currently supported sensors:
// Each sensor have the following properties/functions:
// label: A string containing a user friendly label for the sensor
// format(): A function to format the sensor's value into its representable string
// get(): A function that returns the value of the sensor from the specified telemetry data
// chartType: A string providing a recommendation of what type of chart to use when showing the sensor's history
// category: The category that the sensor belongs to.
export const sensors = {
  'gps.satellites': {
    label: 'GPS Satellites',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => {
      return {
        local_time: telemetry.gps.local_time,
        value: telemetry.gps.satellites
      }
    },
    chartType: 'line',
    category: 'gps'
  },

  'gps.speed': {
    label: 'GPS Speed',
    format: (value) => {
      return `${value} km/h`
    },
    get: (telemetry) => {
      return {
        local_time: telemetry.gps.local_time,
        value: telemetry.gps.speed
      }
    },
    chartType: 'line',
    category: 'gps'
  },

  'ignition': {
    label: 'Ignition',
    format: (value) => {
      switch (value) {
        case 'acc':
          return 'ACC'

        case 'on':
          return 'On'

        case 'off':
          return 'Off'

        default:
          return value
      }
    },
    get: (telemetry) => fromTelemetry('ignition', telemetry),
    chartType: null,
    category: 'general'
  },

  'ebat_volts': {
    label: 'Ext. Batt',
    format: (value) => {
      return `${value} V`
    },
    get: (telemetry) => fromTelemetry('ebat_volts', telemetry),
    chartType: 'line',
    category: 'battery'
  },

  'ibat_volts': {
    label: 'Int. Batt',
    format: (value) => {
      return `${value} V`
    },
    get: (telemetry) => fromTelemetry('ibat_volts', telemetry),
    chartType: 'line',
    category: 'battery'
  },

  'ibutton': {
    label: 'IButton',
    format: (value) => {
      return value
    },
    get: (telemetry) => fromTelemetry('ibutton', telemetry),
    chartType: null,
    category: 'driver'
  },

  'fuel_consumed': {
    label: 'Fuel Consumed',
    format: (value) => {
      return `${value} ℓ`
    },
    get: (telemetry) => fromTelemetry('fuel_consumed', telemetry),
    chartType: 'line',
    category: 'fuel'
  },

  'eng_work_time': {
    label: 'Eng. Work time',
    format: (value) => {
      return secsToHMS(value)
    },
    get: (telemetry) => fromTelemetry('eng_work_time', telemetry),
    chartType: null,
    category: 'engine'
  },

  'eng_load_perc': {
    label: 'Eng. Load Percentage',
    format: (value) => {
      return `${value} %`
    },
    get: (telemetry) => fromTelemetry('eng_load_perc', telemetry),
    chartType: 'line',
    category: 'engine'
  },

  'tach_tot_dist_km': {
    label: 'Tacho Tot. Dist.',
    format: (value) => {
      return `${value} km`
    },
    get: (telemetry) => fromTelemetry('tach_tot_dist_km', telemetry),
    chartType: null,
    category: 'odometer'
  },

  'eco_score': {
    label: 'Eco score',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('eco_score', telemetry),
    chartType: null,
    category: 'general'
  },

  'speed': {
    label: 'Speed',
    format: (value) => {
      return `${value} km/h`
    },
    get: (telemetry) => fromTelemetry('speed', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'ibat_amps': {
    label: 'Int. Batt Amps',
    format: (value) => {
      return `${value} A`
    },
    get: (telemetry) => fromTelemetry('ibat_amps', telemetry),
    chartType: 'line',
    category: 'battery'
  },

  'lvcan_speed': {
    label: 'LVCAN Speed',
    format: (value) => {
      return `${value} km/h`
    },
    get: (telemetry) => fromTelemetry('lvcan_speed', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'acc_pedal_pos': {
    label: 'Acc Pedal Position',
    format: (value) => {
      return `${value} %`
    },
    get: (telemetry) => fromTelemetry('acc_pedal_pos', telemetry),
    chartType: 'line',
    category: 'engine'
  },

  'fuel_lvl': {
    label: 'Fuel Level',
    format: (value) => {
      return `${value} ℓ`
    },
    get: (telemetry) => fromTelemetry('fuel_lvl', telemetry),
    chartType: 'line',
    category: 'fuel'
  },

  'eng_rpm': {
    label: 'Eng. RPM',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('eng_rpm', telemetry),
    chartType: 'line',
    category: 'engine'
  },

  'tot_mileage_km': {
    label: 'Total Mileage',
    format: (value) => {
      return `${value} km`
    },
    get: (telemetry) => fromTelemetry('tot_mileage_km', telemetry),
    chartType: null,
    category: 'odometer'
  },

  'fuel_level_perc': {
    label: 'Fuel Level Percentage',
    format: (value) => {
      return `${value} %`
    },
    get: (telemetry) => fromTelemetry('fuel_level_perc', telemetry),
    chartType: 'line',
    category: 'fuel'
  },

  'eng_temp': {
    label: 'Eng. Temperature',
    format: (value) => {
      return `${value} ℃`
    },
    get: (telemetry) => fromTelemetry('eng_temp', telemetry),
    chartType: 'line',
    category: 'engine'
  },

  'trip_odo': {
    label: 'Trip Odometer',
    format: (value) => {
      return `${value} km`
    },
    get: (telemetry) => fromTelemetry('trip_odo', telemetry),
    chartType: null,
    category: 'odometer'
  },

  'movement': {
    label: 'Movement',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('movement', telemetry),
    chartType: null,
    category: 'odometer'
  },

  'prog_number': {
    label: 'Program Number',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('prog_number', telemetry),
    chartType: null,
    category: 'general'
  },

  'module_id': {
    label: 'Module ID',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('module_id', telemetry),
    chartType: null,
    category: 'general'
  },

  // Check format
  'eng_total_time': {
    label: 'Eng. Total Time',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('eng_total_time', telemetry),
    chartType: null,
    category: 'engine'
  },

  // Check format
  'tot_mileage_cnt': {
    label: 'Total Mileage Count',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tot_mileage_cnt', telemetry),
    chartType: null,
    category: 'odometer'
  },

  'fuel_consumed_cnt': {
    label: 'Fuel Consumed Count',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('fuel_consumed_cnt', telemetry),
    chartType: null,
    category: 'fuel'
  },

  'fuel_rate': {
    label: 'Fuel Rate',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('fuel_rate', telemetry),
    chartType: 'line',
    category: 'fuel'
  },

  'adblue_lvl_perc': {
    label: 'AdBlue Level Percentage',
    format: (value) => {
      return `${value} %`
    },
    get: (telemetry) => fromTelemetry('adblue_lvl_perc', telemetry),
    chartType: 'line',
    category: 'adblue'
  },

  'adblue_lvl': {
    label: 'AdBlue Level',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('adblue_lvl', telemetry),
    chartType: 'line',
    category: 'adblue'
  },

  'cont_state_flag': {
    label: 'Control State Flags',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('cont_state_flag', telemetry),
    chartType: null,
    category: 'general'
  },

  'agri_mach_flags': {
    label: 'Agricultural Machinery Flags',
    format: (value) => {
      return isNaN(value) ? value : '0x' + value.toString(16)
    },
    get: (telemetry) => fromTelemetry('agri_mach_flags', telemetry),
    chartType: null,
    category: 'agricultural'
  },

  'harvesting_time': {
    label: 'Harvesting Time',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('harvesting_time', telemetry),
    chartType: null,
    category: 'agricultural'
  },

  'area_of_harvest': {
    label: 'Area Of Harvest',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('area_of_harvest', telemetry),
    chartType: 'line',
    category: 'agricultural'
  },

  'mowing_eff': {
    label: 'Mowing Efficiency',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('mowing_eff', telemetry),
    chartType: 'line',
    category: 'agricultural'
  },

  'grain_mown_vol': {
    label: 'Grain Mow Volume',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('grain_mown_vol', telemetry),
    chartType: 'line',
    category: 'agricultural'
  },

  'grain_moist_perc': {
    label: 'Grain Moisture',
    format: (value) => {
      return `${value} %`
    },
    get: (telemetry) => fromTelemetry('grain_moist_perc', telemetry),
    chartType: 'line',
    category: 'agricultural'
  },

  'harv_drum_rpm': {
    label: 'Harvesting Drum RPM',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('harv_drum_rpm', telemetry),
    chartType: 'line',
    category: 'agricultural'
  },

  'harv_drum_gap': {
    label: 'Gap Under Harvesting Drum',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('harv_drum_gap', telemetry),
    chartType: 'line',
    category: 'agricultural'
  },

  'sec_state_flags': {
    label: 'Security State Flags',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('sec_state_flags', telemetry),
    chartType: null,
    category: 'general'
  },

  'trip_dist_km': {
    label: 'Trip Distance',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('trip_dist_km', telemetry),
    chartType: null,
    category: 'odometer'
  },

  'tach_veh_speed': {
    label: 'Tacho Vehicle Speed',
    format: (value) => {
      return `${value} km/h`
    },
    get: (telemetry) => fromTelemetry('tach_veh_speed', telemetry),
    chartType: null,
    category: 'general'
  },

  'tach_driv_card': {
    label: 'Tacho Driver Card Presence',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tach_driv_card', telemetry),
    chartType: null,
    category: 'driver'
  },

  'bat_temp': {
    label: 'Battery Temperature',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('bat_temp', telemetry),
    chartType: 'line',
    category: 'battery'
  },

  'bat_lvl_perc': {
    label: 'Battery Level Percentage',
    format: (value) => {
      return `${value} %`
    },
    get: (telemetry) => fromTelemetry('bat_lvl_perc', telemetry),
    chartType: 'line',
    category: 'battery'
  },

  'dtc_faults': {
    label: 'DTC Faults Count',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('dtc_faults', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'slope_of_arm': {
    label: 'Slope of Arm',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('slope_of_arm', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'rot_of_arm': {
    label: 'Rotation of Arm',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('rot_of_arm', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'eject_of_arm': {
    label: 'Eject of Arm',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('eject_of_arm', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'hrz_dist_arm': {
    label: 'Horizontal Distance Arm',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('hrz_dist_arm', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'height_of_arm': {
    label: 'Height Arm Above Ground',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('height_of_arm', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'drill_rpm': {
    label: 'Drill RPM',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('drill_rpm', telemetry),
    chartType: 'line',
    category: 'industrial'
  },

  'salt_spread': {
    label: 'Spread Salt',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('salt_spread', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'bat_volts': {
    label: 'Battery Voltage',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('bat_volts', telemetry),
    chartType: 'line',
    category: 'battery'
  },

  'fine_salt_spread': {
    label: 'Spread Fine Grained Salt',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('fine_salt_spread', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'coarse_salt': {
    label: 'Coarse Grained Salt',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('coarse_salt', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'spread_dimix': {
    label: 'Spread DiMix',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('spread_dimix', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'coarse_cal_spread': {
    label: 'Spread Coarse Grained Calcium',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('coarse_cal_spread', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'sod_chlor_spread': {
    label: 'Spread Sodium Chloride',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('sod_chlor_spread', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'cal_chlor_spread': {
    label: 'Spread Calcium Chloride',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('cal_chlor_spread', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'mag_chlor_spread': {
    label: 'Spread Magnesium Chloride',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('mag_chlor_spread', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'gravel_spread': {
    label: 'Amount Of Spread Gravel',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('gravel_spread', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'sand_spread': {
    label: 'Amount Of Spread Sand',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('sand_spread', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'width_pour_left': {
    label: 'Width Pouring Left',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('width_pour_left', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'width_pour_right': {
    label: 'Width Pouring Right',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('width_pour_right', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'salt_work_hr': {
    label: 'Salt Spreader Working Hours',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('salt_work_hr', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'dist_during_salting': {
    label: 'Distance During Salting',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('dist_during_salting', telemetry),
    chartType: null,
    category: 'industrial'
  },

  'load_weight': {
    label: 'Load Weight',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('load_weight', telemetry),
    chartType: 'line',
    category: 'industrial'
  },

  'retard_load_perc': {
    label: 'Retarder Load',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('retard_load_perc', telemetry),
    chartType: null,
    category: 'engine'
  },

  'cruise_time': {
    label: 'Cruise Time',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('cruise_time', telemetry),
    chartType: null,
    category: 'engine'
  },

  'cng_status': {
    label: 'CNG Status',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('cng_status', telemetry),
    chartType: null,
    category: 'fuel'
  },

  'cng_used': {
    label: 'CNG Used',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('cng_used', telemetry),
    chartType: null,
    category: 'fuel'
  },

  'cng_lvl_perc': {
    label: 'CNG Level Percentage',
    format: (value) => {
      return `${value} %`
    },
    get: (telemetry) => fromTelemetry('cng_lvl_perc', telemetry),
    chartType: 'line',
    category: 'fuel'
  },

  'eng_oil_lvl': {
    label: 'Eng. Oil Level',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('eng_oil_lvl', telemetry),
    chartType: 'line',
    category: 'engine'
  },

  // Dallas temps can hold up to 4 value
  'dallas_temp': {
    label: 'Dallas Temperature',
    format: (value) => {
      return value + '℃'
    },
    get: (telemetry) => fromTelemetry('dallas_temp', telemetry),
    chartType: 'line',
    category: 'dallas_temp'
  },

  // Dallas temps can hold up to 4 value
  'dallas_temp_id': {
    label: 'Dallas Temperature ID',
    format: (value) => {
      return value
    },
    get: (telemetry) => fromTelemetry('dallas_temp_id', telemetry),
    chartType: null,
    category: 'dallas_temp'
  },

  'sleep_mode': {
    label: 'Sleep Mode',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('sleep_mode', telemetry),
    chartType: null,
    category: 'general'
  },

  // Unknown amount of doors as value is array
  'doors_open': {
    label: 'Doors Open',
    format: (value) => {
      return `${value[0]}`
    },
    get: (telemetry) => fromTelemetry('doors_open', telemetry),
    chartType: null,
    category: 'general'
  },

  // Value is array
  'axl_load': {
    label: 'Axle Load',
    format: (value) => {
      return `${value[0]}`
    },
    get: (telemetry) => fromTelemetry('axl_load', telemetry),
    chartType: 'line',
    category: 'general'
  },

  // Value is array
  'driver_states': {
    label: 'Driver State',
    format: (value) => {
      return value === '00000000000000000000000000000000' ? 'Unknown' : value
    },
    get: (telemetry) => fromTelemetry('driver_states', telemetry),
    chartType: null,
    category: 'driver_state'
  },

  // Value is array for driver 1 and 2
  'driver_cont_times': {
    label: 'Continuous Driving Time',
    format: (value) => {
      return value
    },
    get: (telemetry) => fromTelemetry('driver_cont_times', telemetry),
    chartType: null,
    category: 'driver_state'
  },

  // Value is array for driver 1 and 2
  'driver_break_times': {
    label: 'Cumulative Break Time',
    format: (value) => {
      return value
    },
    get: (telemetry) => fromTelemetry('driver_break_times', telemetry),
    chartType: null,
    category: 'driver_state'
  },

  // Value is array for driver 1 and 2
  'driver_act_dur': {
    label: 'Duration of Selected Activity',
    format: (value) => {
      return value
    },
    get: (telemetry) => fromTelemetry('driver_act_dur', telemetry),
    chartType: null,
    category: 'driver_state'
  },

  // Value is array for driver 1 and 2
  'driver_cumu_times': {
    label: 'Cumulative Driving Time',
    format: (value) => {
      return value
    },
    get: (telemetry) => fromTelemetry('driver_cumu_times', telemetry),
    chartType: null,
    category: 'driver_state'
  },

  // Value is array for driver 1 and 2
  'driver_ids': {
    label: 'Driver Id\'s',
    format: (value) => {
      return value
    },
    get: (telemetry) => fromTelemetry('driver_ids', telemetry),
    chartType: null,
    category: 'driver_state'
  },

  // Is added by LDPS or DPPS
  'pp_idling': {
    label: 'Idling (Detected via Processing)',
    format: (value) => {
      return value ? 'Yes' : 'No'
    },
    get: (telemetry) => fromTelemetry('pp_idling', telemetry),
    chartType: null,
    category: 'engine'
  },

  // TODO :: Get correct label
  'rec_in_flash': {
    label: 'Rec In Flash',
    format: (value) => {
      return value
    },
    get: (telemetry) => fromTelemetry('rec_in_flash', telemetry),
    chartType: null,
    category: 'general'
  },

  'ibutton_auth': {
    label: 'IButton Authorization',
    format: (value) => {
      return value
    },
    get: (telemetry) => fromTelemetry('ibutton_auth', telemetry),
    chartType: null,
    category: 'driver'
  },

  'sd_present': {
    label: 'SD Status',
    format: (value) => {
      return value === 0 ? 'Not Present' : 'Present'
    },
    get: (telemetry) => fromTelemetry('sd_present', telemetry),
    chartType: null,
    category: 'general'
  },

  'fuel_used_gps': {
    label: 'Fuel Used GPS',
    format: (value) => {
      return `${value} ℓ`
    },
    get: (telemetry) => fromTelemetry('fuel_used_gps', telemetry),
    chartType: 'line',
    category: 'fuel'
  },

  'fuel_rate_gps': {
    label: 'Fuel Rate GPS',
    format: (value) => {
      return `${value} ℓ/100km`
    },
    get: (telemetry) => fromTelemetry('fuel_rate_gps', telemetry),
    chartType: 'line',
    category: 'fuel'
  },

  'total_odo': {
    label: 'Total Odometer',
    format: (value) => {
      return `${value} km`
    },
    get: (telemetry) => fromTelemetry('total_odo', telemetry),
    chartType: null,
    category: 'odometer'
  },

  'accel_x': {
    label: 'Acceleration X',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('accel_x', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'accel_y': {
    label: 'Acceleration Y',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('accel_y', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'accel_z': {
    label: 'Acceleration Z',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('accel_z', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'ibat_perc': {
    label: 'Internal Battery Percentage',
    format: (value) => {
      return `${value} %`
    },
    get: (telemetry) => fromTelemetry('ibat_perc', telemetry),
    chartType: 'line',
    category: 'battery'
  },

  // TODO :: Check values if 0 and 1 return 'connected' and 'not connected'
  'charger_conn': {
    label: 'Charger Connected',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('charger_conn', telemetry),
    chartType: null,
    category: 'general'
  },

  'rfid': {
    label: 'RFID',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('rfid', telemetry),
    chartType: null,
    category: 'general'
  },

  'user_id': {
    label: 'User ID',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('user_id', telemetry),
    chartType: null,
    category: 'general'
  },

  // TODO :: Get correct Labels for obd sensors
  'obd_accum_mil': {
    label: 'Accumulative Mileage',
    format: (value) => {
      return `${value} km`
    },
    get: (telemetry) => fromTelemetry('obd_accum_mil', telemetry),
    chartType: null,
    category: 'odometer'
  },

  // TODO :: Check formats of fuel related obd sensors
  'obd_inst_fuel': {
    label: 'Inst Fuel',
    format: (value) => {
      return `${value} ℓ`
    },
    get: (telemetry) => fromTelemetry('obd_inst_fuel', telemetry),
    chartType: 'line',
    category: 'fuel'
  },

  'obd_avg_fuel': {
    label: 'Average Fuel',
    format: (value) => {
      return `${value} ℓ`
    },
    get: (telemetry) => fromTelemetry('obd_avg_fuel', telemetry),
    chartType: 'line',
    category: 'fuel'
  },

  'obd_drive_time': {
    label: 'Drive Time',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('obd_drive_time', telemetry),
    chartType: null,
    category: 'general'
  },

  'obd_speed': {
    label: 'Speed',
    format: (value) => {
      return `${value} km/h`
    },
    get: (telemetry) => fromTelemetry('obd_speed', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'obd_power_load': {
    label: 'Power Load',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('obd_power_load', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'obd_water_temp': {
    label: 'Water Temperature',
    format: (value) => {
      return `${value} ℃`
    },
    get: (telemetry) => fromTelemetry('obd_water_temp', telemetry),
    chartType: 'line',
    category: 'engine'
  },

  'obd_throttle_perc': {
    label: 'Throttle Percentage',
    format: (value) => {
      return `${value} %`
    },
    get: (telemetry) => fromTelemetry('obd_throttle_perc', telemetry),
    chartType: 'line',
    category: 'engine'
  },

  'obd_engine_speed': {
    label: 'Engine Speed',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('obd_engine_speed', telemetry),
    chartType: 'line',
    category: 'engine'
  },

  'obd_battery_volts': {
    label: 'Battery Volts',
    format: (value) => {
      return `${value} V`
    },
    get: (telemetry) => fromTelemetry('obd_battery_volts', telemetry),
    chartType: 'line',
    category: 'battery'
  },

  'obd_diag_code_01': {
    label: 'Diagnostic Code 1',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('obd_diag_code_01', telemetry),
    chartType: null,
    category: 'general'
  },

  'obd_diag_code_02': {
    label: 'Diagnostic Code 2',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('obd_diag_code_02', telemetry),
    chartType: null,
    category: 'general'
  },

  'obd_diag_code_03': {
    label: 'Diagnostic Code 3',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('obd_diag_code_03', telemetry),
    chartType: null,
    category: 'general'
  },

  'obd_diag_code_04': {
    label: 'Diagnostic Code 4',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('obd_diag_code_04', telemetry),
    chartType: null,
    category: 'general'
  },

  'tpms_device_stat': {
    label: 'Device Status',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tpms_device_stat', telemetry),
    chartType: null,
    category: 'general'
  },

  'tpms_no_of_wheels': {
    label: 'Number Of Wheels',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tpms_no_of_wheels', telemetry),
    chartType: null,
    category: 'general'
  },

  'tpms_lf_press': {
    label: 'Left Front Pressure',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tpms_lf_press', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'tpms_lf_temp': {
    label: 'Left Front Temperature',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tpms_lf_temp', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'tpms_lf_state': {
    label: 'Left Front State',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tpms_lf_state', telemetry),
    chartType: null,
    category: 'general'
  },

  'tpms_rf_press': {
    label: 'Right Front Pressure',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tpms_rf_press', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'tpms_rf_temp': {
    label: 'Right Front Temperature',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tpms_rf_temp', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'tpms_rf_state': {
    label: 'Right Front State',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tpms_rf_state', telemetry),
    chartType: null,
    category: 'general'
  },

  'tpms_lr_press': {
    label: 'Left Rear Pressure',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tpms_lr_press', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'tpms_lr_temp': {
    label: 'Left Rear Temperature',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tpms_lr_temp', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'tpms_lr_state': {
    label: 'Left Rear State',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tpms_lr_state', telemetry),
    chartType: null,
    category: 'general'
  },

  'tpms_rr_press': {
    label: 'Right Rear Pressure',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tpms_rr_press', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'tpms_rr_temp': {
    label: 'Right Rear Temperature',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tpms_rr_temp', telemetry),
    chartType: 'line',
    category: 'general'
  },

  'tpms_rr_state': {
    label: 'Right Rear State',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('tpms_rr_state', telemetry),
    chartType: null,
    category: 'general'
  },

  'pulse_cnt_din': {
    label: 'DIN Pulse Counter',
    format: (value) => {
      return value
    },
    get: (telemetry) => fromTelemetry('pulse_cnt_din', telemetry),
    chartType: null,
    category: 'io'
  },

  'ble_temp': {
    label: 'BLE Temperatures',
    format: (value) => {
      return value + '℃'
    },
    get: (telemetry) => fromTelemetry('ble_temp', telemetry),
    chartType: 'line',
    category: 'ble_temperature'
  },

  'ble_temp_errors': {
    label: 'BLE Temperatures Errors',
    format: (value) => {
      return value
    },
    get: (telemetry) => fromTelemetry('ble_temp_errors', telemetry),
    chartType: null,
    category: 'ble_temperature'
  },

  'ble_bat_perc': {
    label: 'BLE Battery Percentage',
    format: (value) => {
      return value
    },
    get: (telemetry) => fromTelemetry('ble_bat_perc', telemetry),
    chartType: 'line',
    category: 'ble_battery'
  },

  'ble_humidity': {
    label: 'BLE Humidity',
    format: (value) => {
      return value + '%RH'
    },
    get: (telemetry) => fromTelemetry('ble_humidity', telemetry),
    chartType: 'line',
    category: 'ble_temperature'
  },

  'ble_humidity_errors': {
    label: 'BLE Humidity Errors',
    format: (value) => {
      return value
    },
    get: (telemetry) => fromTelemetry('ble_humidity_errors', telemetry),
    chartType: null,
    category: 'ble_temperature'
  },

  // TODO :: Check that sensor names for ble sensors is correct.
  'ble_fuel_level': {
    label: 'BLE Fuel Level',
    format: (value) => {
      return value + 'ℓ'
    },
    get: (telemetry) => fromTelemetry('ble_fuel_level', telemetry),
    chartType: 'line',
    category: 'ble_fuel'
  },

  'ble_fuel_freq': {
    label: 'BLE Fuel Frequency',
    format: (value) => {
      return value
    },
    get: (telemetry) => fromTelemetry('ble_fuel_freq', telemetry),
    chartType: 'line',
    category: 'ble_fuel'
  },

  'ble_luminosity': {
    label: 'BLE Luminosity',
    format: (value) => {
      return value
    },
    get: (telemetry) => fromTelemetry('ble_luminosity', telemetry),
    chartType: 'line',
    category: 'ble_luminosity'
  },

  'lls_fuel': {
    label: 'LLS Fuel',
    format: (value) => {
      return value + 'ℓ'
    },
    get: (telemetry) => fromTelemetry('lls_fuel', telemetry),
    chartType: 'line',
    category: 'lls_fuel'
  },

  'lls_temp': {
    label: 'LLS Temperature',
    format: (value) => {
      return value + '℃'
    },
    get: (telemetry) => fromTelemetry('lls_temp', telemetry),
    chartType: 'line',
    category: 'lls_temp'
  },

  'odometer': {
    label: 'Odometer',
    format: (value) => {
      return `${value} km`
    },
    get: (telemetry) => fromTelemetry('odometer', telemetry),
    chartType: null,
    category: 'odometer'
  },

  'engine_hours': {
    label: 'Engine Hours',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('engine_hours', telemetry),
    chartType: null,
    category: 'engine'
  },

  'pulse_counter': {
    label: 'Pulse Counter',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('pulse_counter', telemetry),
    chartType: null,
    category: 'io'
  },

  'adc1': {
    label: 'ADC1',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('adc1', telemetry),
    chartType: null,
    category: 'io'
  },

  'adc2': {
    label: 'ADC2',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('adc2', telemetry),
    chartType: null,
    category: 'io'
  },

  'private_mode': {
    label: 'Private Mode',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('private_mode', telemetry),
    chartType: null,
    category: 'io'
  },

  'inside_fences': {
    label: 'Inside Fences',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('inside_fences', telemetry),
    chartType: null,
    category: 'general'
  },

  'outside_fences': {
    label: 'Outside Fences',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('outside_fences', telemetry),
    chartType: null,
    category: 'general'
  },

  'fuel_level': {
    label: 'Fuel Level',
    format: (value) => {
      return `${value} ℓ`
    },
    get: (telemetry) => fromTelemetry('fuel_level', telemetry),
    chartType: 'line',
    category: 'fuel'
  },

  'user_alarms': {
    label: 'User Alarms',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('user_alarms', telemetry),
    chartType: null,
    category: 'general'
  },

  'gps_mileage': {
    label: 'GPS Mileage',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('gps_mileage', telemetry),
    chartType: null,
    category: 'gps'
  },

  'operator_no_1': {
    label: 'Operator No 1',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('operator_no_1', telemetry),
    chartType: null,
    category: 'general'
  },

  'operator_no_2': {
    label: 'Operator No 2',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('operator_no_2', telemetry),
    chartType: null,
    category: 'general'
  },

  'temp_01': {
    label: 'Temperature 1',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('temp_01', telemetry),
    chartType: null,
    category: 'general'
  },

  'ambient_temp': {
    label: 'Ambient Temperature',
    format: (value) => {
      return `${value}`
    },
    get: (telemetry) => fromTelemetry('ambient_temp', telemetry),
    chartType: null,
    category: 'general'
  }
}

/**
 * Returns a sensor's value together with a timestamp/local_time.
 *
 * @param name String
 * @param telemetry Object
 *
 * @return Object
 */
export const withTimestamp = (name, telemetry) => {
  if (typeof sensors[name] !== 'undefined') {
    return sensors[name].get(telemetry)
  } else {
    return null
  }
}

export const sensorAvailable = (sensor) => {
  return sensors.hasOwnProperty(sensor)
}

export const fmtSensorValue = (sensor, value) => {
  if (sensors.hasOwnProperty(sensor)) {
    return sensors[sensor]['format'](value)
  } else {
    return null
  }
}

export const sensorLabel = (sensor) => {
  if (sensors.hasOwnProperty(sensor)) {
    return sensors[sensor]['label']
  } else {
    return null
  }
}
