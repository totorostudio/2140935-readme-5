import { Module } from '@nestjs/common';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { FileStorageConfigModule } from '@project/shared/config/file-storage';

@Module({
  imports: [
    FileUploaderModule,
    FileStorageConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
