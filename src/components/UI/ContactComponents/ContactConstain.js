
import {
  FaWhatsapp,
  FaEnvelope,
  FaClock,
  FaUser,
  FaPhone,
  FaCar,
} from "react-icons/fa";

export const WHATSAPP_NUMBER = '+918299431275';

export const CONTACT_INFOS = [
  { icon: FaWhatsapp, label: 'WhatsApp', value: '+91 8299431275', color: 'bg-green-900/30', accent: 'text-green-400' },
  { icon: FaEnvelope, label: 'Email', value: 'contact@hexagonsservices.com', color: 'bg-orange-900/30', accent: 'text-orange-400 text-lg' },
  { icon: FaClock, label: 'Hours', value: 'Mon-Sat: 8AM-8PM', color: 'bg-orange-900/30', accent: 'text-orange-400 text-lg', extra: 'Sunday: 8AM-2PM' },
];

export const CAR_TYPES = ['Economy', 'SUV', 'Luxury', 'Van', 'Sports Car', 'Convertible'];

export const FIELD_CONFIG = [
  { name: 'name',  type: 'text',  icon: FaUser,    placeholder: 'Full Name' },
  { name: 'email', type: 'email', icon: FaEnvelope, placeholder: 'Email Address' },
  { name: 'phone', type: 'tel',   icon: FaPhone,   placeholder: 'Phone Number' },
  { name: 'carType', type: 'select', icon: FaCar,  placeholder: 'Select Car Type' },
];

export const FADE_IN_KEYFRAMES = `
@keyframes fadeIn { 
  from { opacity: 0; transform: translateY(10px);} 
  to   { opacity: 1; transform: translateY(0);} 
}
.animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
`;

