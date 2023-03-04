import { Result } from './Result';
import { UniqueEntityID } from './UniqueEntityID';

export interface Repository<EXCEPTIONS, ENTITY> {
    create(props: ENTITY): Promise<Result<EXCEPTIONS, void>>;

    readById(id: UniqueEntityID): Promise<Result<EXCEPTIONS, ENTITY>>;

    readAll<Q>(query?: Q): Promise<Result<EXCEPTIONS, ENTITY[]>>;

    updateById(id: UniqueEntityID, props: ENTITY): Promise<Result<EXCEPTIONS, void>>;

    deleteById(id: UniqueEntityID): Promise<Result<EXCEPTIONS, void>>;
}
