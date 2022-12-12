export type Region = 'Global' | 'EU' | 'Asia' | 'North America' | 'South America' | 'Oceania' | 'Africa'

type RegionalPartLinks = Partial<Record<Region, string[]>>
export type VerifiedParts = Record<string, RegionalPartLinks>

const esp32devkitcv4: RegionalPartLinks = {
  Global: [
    'https://www.aliexpress.com/item/32864722159.html',
    'https://www.amazon.com/KeeYees-Development-Bluetooth-Microcontroller-ESP-WROOM-32/dp/B07QCP2451/ref=sr_1_5',
  ],
}

const verifyedParts = {
  'ESP32-DevKitC V4': esp32devkitcv4,
}

export default verifyedParts as typeof verifyedParts
