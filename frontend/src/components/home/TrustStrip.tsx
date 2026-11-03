import { Marquee } from '@/components/ui/Marquee';
import {
  BlueStarLogo,
  CarrierLogo,
  DaikinLogo,
  GeneralLogo,
  LgLogo,
  MitsubishiElectricLogo,
  ToshibaLogo,
  TraneLogo,
  VoltasLogo,
} from './HvacBrandLogos';

const BRANDS = [
  { name: 'Daikin', Component: DaikinLogo },
  { name: 'Carrier', Component: CarrierLogo },
  { name: 'Mitsubishi Electric', Component: MitsubishiElectricLogo },
  { name: 'General', Component: GeneralLogo },
  { name: 'Voltas', Component: VoltasLogo },
  { name: 'Blue Star', Component: BlueStarLogo },
  { name: 'Trane', Component: TraneLogo },
  { name: 'LG', Component: LgLogo },
  { name: 'Toshiba', Component: ToshibaLogo },
];

/**
 * Section 2 — scrolling marquee of major HVAC equipment and system brands.
 */
export function TrustStrip() {
  return (
    <section aria-label="HVAC systems and equipment brands" className="pb-8 md:pb-12">
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
