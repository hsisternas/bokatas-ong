import React from 'react';

// Componente base para renderizar iconos de Material Symbols
const Icon: React.FC<{ iconName: string; className?: string }> = ({ iconName, className, ...props }) => (
    <span 
      className={`material-symbols-outlined flex items-center justify-center ${className}`} 
      {...props}
    >
        {iconName}
    </span>
);

// Se exportan los componentes de iconos con el nombre del icono de Material Symbols correspondiente
export const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon {...props} iconName="info" />;
export const BedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon {...props} iconName="bed" />;
export const FoodIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon {...props} iconName="restaurant" />;
export const ShowerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon {...props} iconName="shower" />;
export const HealthIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon {...props} iconName="health_and_safety" />;
export const ClothesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon {...props} iconName="checkroom" />;
export const WorkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon {...props} iconName="work" />;
export const LegalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon {...props} iconName="gavel" />;
export const BookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon {...props} iconName="menu_book" />;
export const WomanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon {...props} iconName="woman" />;
export const CompassIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon {...props} iconName="explore" />;
export const StreetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon {...props} iconName="emoji_people" />;
export const MapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon {...props} iconName="map" />;
export const OtherIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon {...props} iconName="more_horiz" />;