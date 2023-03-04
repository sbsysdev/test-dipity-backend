import { Repository } from '../../../shared/domain';
import { ClientEntity } from './Client.entity';
import { ClientError } from './Client.error';

export interface ClientRepository extends Repository<ClientError, ClientEntity> {}
