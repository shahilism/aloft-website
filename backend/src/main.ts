import { createApp } from './app.factory';
import { AppConfigService } from './config/app-config.service';

async function bootstrap(): Promise<void> {
  const app = await createApp();
  const port = app.get(AppConfigService).get('PORT');
  await app.listen(port, '0.0.0.0');
}

void bootstrap();
