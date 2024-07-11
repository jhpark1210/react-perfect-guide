export interface TimerProps {
   title: string;
   targetTime: number;
}

export interface ModalProps {
   title: string;
   onReset: () => void;
}

export type Task = {
   title: string;
   targetTime: number;
};
