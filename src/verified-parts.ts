export type Region = 'Global' | 'EU' | 'Asia' | 'North America' | 'South America' | 'Oceania' | 'Africa'

export interface RegionalLinkObject {
  suffix?: string
  url: string
  qtyPer?: number
  pricePer: number
}
export type RegionalLink = |
  [string, number, number?] | // [Link, Cost per, Qty = 1]
  RegionalLinkObject
export type RegionalLinkArray = [RegionalLink, ...RegionalLink[]] // At least 1 value
export type RegionalPartLinks = Partial<Record<Region, RegionalLinkArray>> & { Global: RegionalLinkArray } // Global is required
export type VerifiedParts = Record<string, RegionalPartLinks>

const esp32devkitcv4: RegionalPartLinks = {
  'Global': [
    ['https://aliexpress.ru/item/32864722159.html?sku_id=12000028745117645', 3.13],
    ['https://www.amazon.com/KeeYees-Development-Bluetooth-Microcontroller-ESP-WROOM-32/dp/B07QCP2451/ref=sr_1_5', 13.99],
  ],
}

const uln2803: RegionalPartLinks = {
  'Global': [
    {
      suffix: '10 pcs',
      url: 'https://www.aliexpress.com/item/32881616806.html?sku_id=12000020849975625',
      qtyPer: 10,
      pricePer: 1.65,
    },
  ],
  'North America': [
    ['https://www.adafruit.com/product/970', 1.95],
  ],
}

const coinVibrationMotor: RegionalPartLinks = {
  'Global': [
    {
      suffix: '10 pcs',
      url: 'https://www.aliexpress.com/item/1005003987941308.html',
      qtyPer: 10,
      pricePer: 2.35,
    },
  ],
  'North America': [
    ['https://www.adafruit.com/product/1201', 1.95],
  ]
}

const breadboardHalf: RegionalPartLinks = {
  'Global': [
    {
      suffix: 'kit with Jumper Wires',
      url: 'https://www.aliexpress.com/item/32523839459.html?sku_id=12000017755573336',
      pricePer: 2.89
    },
    ['https://www.aliexpress.com/item/32523839459.html?sku_id=12000017755573330', 1.29],
  ],
  'North America': [
    ['https://www.adafruit.com/product/64', 4.95],
    {
      suffix: 'with Mounting Holes',
      url: 'https://www.adafruit.com/product/4539',
      pricePer: 5.00
    },
  ],
}

const jumperWires: RegionalPartLinks = {
  'Global': [
    ['https://www.aliexpress.com/item/32725034190.html', 1.09],
  ],
}

const wiresForSoldering: RegionalPartLinks = {
  'Global': [
    {
      suffix: '26AWG, 10m',
      url: 'https://www.aliexpress.com/item/1005002632016529.html',
      qtyPer: 5,
      pricePer: 2.37,
    },
  ],
}

const verifiedParts: VerifiedParts = {
  'ESP32-DevKitC V4': esp32devkitcv4,
  'ULN2803': uln2803,
  'Coin Vibration Motor': coinVibrationMotor,
  'Half Sized Breadboard': breadboardHalf,
  'Jumper Wires': jumperWires,
  'Wires for soldering': wiresForSoldering,
}

export default verifiedParts
