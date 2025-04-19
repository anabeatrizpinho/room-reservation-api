import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { Reservation } from '@prisma/client';
import { ErrorHandlerService } from 'src/common/errors/errors.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateReservationDto } from './dto/body/create-reservation.dto';
import { UpdateReservationDto } from './dto/body/update-reservation.dto';
import { ReservationDto } from './dto/expose/reservation.expose.dto';
import { ReservationsRepository } from './reservations.repository';

@Serialize(ReservationDto)
@Controller('reservations')
export class ReservationsController {
	constructor(
		private readonly reservationsRepo: ReservationsRepository,
		private readonly errorHandlerService: ErrorHandlerService,
	) {}

	@Post()
	async create(@Body() body: CreateReservationDto): Promise<Reservation> {
		try {
			return await this.reservationsRepo.create(body);
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}

	@Get()
	async findAll(): Promise<Reservation[]> {
		try {
			return await this.reservationsRepo.findAll();
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}

	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<Reservation> {
		try {
			return await this.reservationsRepo.findOne({ id });
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}

	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: UpdateReservationDto,
	): Promise<Reservation> {
		try {
			return await this.reservationsRepo.update(id, body);
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}

	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<Reservation> {
		try {
			return await this.reservationsRepo.remove({ id });
		} catch (e: any) {
			this.errorHandlerService.handleError(e);
		}
	}
}
