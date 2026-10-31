import { Marquee } from '@/components/ui/Marquee';
import {
  BlueStarLogo,
  CarrierLogo,
  DaikinLogo,
  LgLogo,
  MitsubishiElectricLogo,
  ToshibaLogo,
  TraneLogo,
  VoltasLogo,
  YorkLogo,
} from './HvacBrandLogos';

const BRANDS = [
  { name: 'Daikin', Component: DaikinLogo },
  { name: 'Carrier', Component: CarrierLogo },
  { name: 'Mitsubishi Electric', Component: MitsubishiElectricLogo },
  { name: 'Voltas', Component: VoltasLogo },
  { name: 'Blue Star', Component: BlueStarLogo },
  { name: 'Trane', Component: TraneLogo },
  { name: 'York', Component: YorkLogo },
  { name: 'LG', Component: LgLogo },
  { name: 'Toshiba', Component: ToshibaLogo },
];

/**
 * Section 2 — scrolling marquee of major HVAC equipment and system brands.
 */
export function TrustStrip() {
  return (
    <section aria-label="HVAC systems and equipment brands" className="pb-16 md:pb-24">
      <div className="container-page">
        <Marquee label="Major HVAC equipment brands" className="w-full">
          {BRANDS.map(({ name, Component }) => (
            <div
              key={name}
              className="flex items-center px-4 text-petrol/75 transition-all duration-200 hover:text-petrol"
              title={name}
            >
              <Component className="h-7 w-auto" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
