export interface ComponentMetadata {
  variants?: string[];
  accessibility?: {
    keyboard_supported: boolean;
    role: string;
  };
  [key: string]: any;
}

export interface Component {
  id: number;
  name: string;
  slug: string;
  template_code: string;
  logic_code?: string;
  metadata: ComponentMetadata;
}

export interface CustomStyles {
  primaryColor: string;
  borderRadius: number;
  animation: string;
}
