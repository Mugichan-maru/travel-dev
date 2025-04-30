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
  onClose: () => void;
  onSave: (item: TravelItem) => void;
};
