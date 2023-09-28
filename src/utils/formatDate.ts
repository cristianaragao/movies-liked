import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const parseDateString = (dataString: string) => {
  const data = new Date(dataString);
  return format(data, "d 'de' MMMM", { locale: ptBR });
};

export const parseStringToDate = (dataString: string) => {
  const data = new Date(dataString+"T00:00:00");
  return format(data, "dd/MM/yyyy");
};
