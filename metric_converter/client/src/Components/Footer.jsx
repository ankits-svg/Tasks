import React from 'react'

const Footer = () => {
    const columns = [
        { id: 'unit', label: 'Unit', minWidth: 100 },
        { id: 'measurement', label: 'Measurement', minWidth: 130 },
      ];
      
      const rows = [
        { unit: 'mm', measurement: 'Length' },
        { unit: 'cm', measurement: 'Length' },
        { unit: 'm', measurement: 'Length' },
        { unit: 'in', measurement: 'Length' },
        { unit: 'ft-us', measurement: 'Length' },
        { unit: 'ft', measurement: 'Length' },
        { unit: 'mi', measurement: 'Length' },
      
        { unit: 'mm2', measurement: 'Area' },
        { unit: 'cm2', measurement: 'Area' },
        { unit: 'm2', measurement: 'Area' },
        { unit: 'ha', measurement: 'Area' },
        { unit: 'km2', measurement: 'Area' },
        { unit: 'in2', measurement: 'Area' },
        { unit: 'ft2', measurement: 'Area' },
        { unit: 'ac', measurement: 'Area' },
        { unit: 'mi2', measurement: 'Area' },
      
        { unit: 'mcg', measurement: 'Mass' },
        { unit: 'mg', measurement: 'Mass' },
        { unit: 'g', measurement: 'Mass' },
        { unit: 'kg', measurement: 'Mass' },
        { unit: 'oz', measurement: 'Mass' },
        { unit: 'lb', measurement: 'Mass' },
        { unit: 'mt', measurement: 'Mass' },
        { unit: 't', measurement: 'Mass' },
      
        { unit: 'mm3', measurement: 'Volume' },
        { unit: 'cm3', measurement: 'Volume' },
        { unit: 'ml', measurement: 'Volume' },
        { unit: 'l', measurement: 'Volume' },
        { unit: 'kl', measurement: 'Volume' },
        { unit: 'm3', measurement: 'Volume' },
        { unit: 'km3', measurement: 'Volume' },
        { unit: 'tsp', measurement: 'Volume' },
        { unit: 'Tbs', measurement: 'Volume' },
        { unit: 'in3', measurement: 'Volume' },
        { unit: 'fl-oz', measurement: 'Volume' },
        { unit: 'cup', measurement: 'Volume' },
        { unit: 'pnt', measurement: 'Volume' },
        { unit: 'qt', measurement: 'Volume' },
        { unit: 'gal', measurement: 'Volume' },
        { unit: 'ft3', measurement: 'Volume' },
        { unit: 'yd3', measurement: 'Volume' },
      
        { unit: 'mm3/s', measurement: 'Volume Flow Rate' },
        { unit: 'cm3/s', measurement: 'Volume Flow Rate' },
        // ... continue adding rows for other Volume Flow Rate units
      
        { unit: 'C', measurement: 'Temperature' },
        { unit: 'F', measurement: 'Temperature' },
        { unit: 'K', measurement: 'Temperature' },
        { unit: 'R', measurement: 'Temperature' },
      
        { unit: 'ns', measurement: 'Time' },
        { unit: 'mu', measurement: 'Time' },
        { unit: 'ms', measurement: 'Time' },
        { unit: 's', measurement: 'Time' },
        { unit: 'min', measurement: 'Time' },
        { unit: 'h', measurement: 'Time' },
        { unit: 'd', measurement: 'Time' },
        { unit: 'week', measurement: 'Time' },
        { unit: 'month', measurement: 'Time' },
        { unit: 'year', measurement: 'Time' },
      
        { unit: 'Hz', measurement: 'Frequency' },
        { unit: 'mHz', measurement: 'Frequency' },
        // ... continue adding rows for other Frequency units
      
        { unit: 'm/s', measurement: 'Speed' },
        { unit: 'km/h', measurement: 'Speed' },
        { unit: 'm/h', measurement: 'Speed' },
        { unit: 'knot', measurement: 'Speed' },
        { unit: 'ft/s', measurement: 'Speed' },
      
        { unit: 's/m', measurement: 'Pace' },
        { unit: 'min/km', measurement: 'Pace' },
        { unit: 's/ft', measurement: 'Pace' },
        // ... continue adding rows for other Pace units
      
        { unit: 'Pa', measurement: 'Pressure' },
        { unit: 'hPa', measurement: 'Pressure' },
        { unit: 'kPa', measurement: 'Pressure' },
        { unit: 'MPa', measurement: 'Pressure' },
        { unit: 'bar', measurement: 'Pressure' },
        { unit: 'torr', measurement: 'Pressure' },
        { unit: 'psi', measurement: 'Pressure' },
        { unit: 'ksi', measurement: 'Pressure' },
      
        { unit: 'b', measurement: 'Digital' },
        { unit: 'Kb', measurement: 'Digital' },
        { unit: 'Mb', measurement: 'Digital' },
        { unit: 'Gb', measurement: 'Digital' },
        { unit: 'Tb', measurement: 'Digital' },
        { unit: 'B', measurement: 'Digital' },
        { unit: 'KB', measurement: 'Digital' },
        { unit: 'MB', measurement: 'Digital' },
        { unit: 'GB', measurement: 'Digital' },
        { unit: 'TB', measurement: 'Digital' },
      
        { unit: 'lx', measurement: 'Illuminance' },
        { unit: 'ft-cd', measurement: 'Illuminance' },
      
        { unit: 'ppm', measurement: 'Parts-Per' },
        { unit: 'ppb', measurement: 'Parts-Per' },
        { unit: 'ppt', measurement: 'Parts-Per' },
        { unit: 'ppq', measurement: 'Parts-Per' },
      
        { unit: 'V', measurement: 'Voltage' },
        { unit: 'mV', measurement: 'Voltage' },
        { unit: 'kV', measurement: 'Voltage' },
      
        { unit: 'A', measurement: 'Current' },
        { unit: 'mA', measurement: 'Current' },
        { unit: 'kA', measurement: 'Current' },
      
        { unit: 'W', measurement: 'Power' },
        { unit: 'mW', measurement: 'Power' },
        { unit: 'kW', measurement: 'Power' },
        { unit: 'MW', measurement: 'Power' },
        { unit: 'GW', measurement: 'Power' },
      
        { unit: 'VA', measurement: 'Apparent Power' },
        { unit: 'mVA', measurement: 'Apparent Power' },
        { unit: 'kVA', measurement: 'Apparent Power' },
        { unit: 'MVA', measurement: 'Apparent Power' },
        { unit: 'GVA', measurement: 'Apparent Power' },
      
        { unit: 'VAR', measurement: 'Reactive Power' },
        { unit: 'mVAR', measurement: 'Reactive Power' },
        { unit: 'kVAR', measurement: 'Reactive Power' },
        { unit: 'MVAR', measurement: 'Reactive Power' },
        { unit: 'GVAR', measurement: 'Reactive Power' },
      
        { unit: 'Wh', measurement: 'Energy' },
        { unit: 'mWh', measurement: 'Energy' },
        { unit: 'kWh', measurement: 'Energy' },
        { unit: 'MWh', measurement: 'Energy' },
        { unit: 'GWh', measurement: 'Energy' },
        { unit: 'J', measurement: 'Energy' },
        { unit: 'kJ', measurement: 'Energy' },
      
        { unit: 'VARh', measurement: 'Reactive Energy' },
        { unit: 'mVARh', measurement: 'Reactive Energy' },
        { unit: 'kVARh', measurement: 'Reactive Energy' },
        { unit: 'MVARh', measurement: 'Reactive Energy' },
        { unit: 'GVARh', measurement: 'Reactive Energy' },
      
        { unit: 'deg', measurement: 'Angle' },
        { unit: 'rad', measurement: 'Angle' },
        { unit: 'grad', measurement: 'Angle' },
        { unit: 'arcmin', measurement: 'Angle' },
        { unit: 'arcsec', measurement: 'Angle' },
      ];
      
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ width: '80%', borderCollapse: 'collapse', margin: 'auto', textAlign:"center"}}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                style={{
                  minWidth: column.minWidth,
                  padding: '8px',
                  backgroundColor: '#f2f2f2',
                  border: '1px solid #ddd',
                  textAlign: 'left',
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    padding: '8px',
                    border: '1px solid #ddd',
                    textAlign: 'left',
                  }}
                >
                  {row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Footer
