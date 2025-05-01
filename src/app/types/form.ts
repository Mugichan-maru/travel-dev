export type FormData = {
  startDate: string;
  stayNights: string;
  departureTime: string;
  disbandTime: string;
};

export type FormErrors = {
  startDate?: string;
  stayNights?: string;
  departureTime?: string;
  disbandTime?: string;
};

export type TravelItem = {
  id: number;
  date: string;
  formattedDate?: string;
  time: string;
  startTime: string;
  endTime: string;
  title: string;
  location: string;
  cost: string;
  notes: string;
  isCompleted: boolean;
};

export type AddTravelModalProps = {
  isOpen: boolean;
  travelInfo: FormData;
  onClose: () => void;
  onSave: (item: TravelItem) => void;
};

export type EditTravelModalProps = {
  isOpen: boolean;
  travelInfo: TravelItem;
  onClose: () => void;
  onDelete: (id: number) => void;
  onSave: (item: TravelItem) => void;
};
