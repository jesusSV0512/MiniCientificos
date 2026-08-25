import { createModel } from './model.js';
import { createView } from './view.js';
import { createController } from './controller.js';

const model = createModel();
const view = createView(document);
createController(model, view);
