import path from 'path';
import { fileURLToPath } from 'url';

const dirname = {
    current: () => {
        const __filename = fileURLToPath(import.meta.url);
        return path.dirname(__filename);
    }
}

export { dirname };