import { PipeTransform , ArgumentMetadata , BadRequestException } from "@nestjs/common";
import { ZodType, ZodError } from "zod";


export class ZodValidationPipe implements PipeTransform {
    constructor(private schema : ZodType<any>) {}

    transform(value: any, metadata: ArgumentMetadata) {
        try {
            return this.schema.parse(value);
        }
        catch(error){
            if (error instanceof ZodError) {
                const errors = error.issues.map(issue => {
                    const cause = issue.path.length ? issue.path.join('.') : 'value';
                    return { cause, message: issue.message };
                });
                throw new BadRequestException({
                    message: 'Validation failed',
                    errors: errors,
                });
            }
            throw new BadRequestException('Validation failed');
        }
    }
}
