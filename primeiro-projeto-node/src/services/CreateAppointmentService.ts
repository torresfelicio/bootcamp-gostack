import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns';


interface Request{
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public execute({ date, provider }: Request): Appointment{
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = appointmentsRepository.findByDate(parseDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}
export default CreateAppointmentService;
