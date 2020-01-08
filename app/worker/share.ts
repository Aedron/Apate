export enum MessageType {
  INIT = "init",
  READY = "ready",
  INIT_IMAGE = "init_image",
  GET_CURRENT_IMAGE_DATA = "get_current_image_data",
  SET_IMAGE_SATURATION = "set_image_saturation",
  SET_IMAGE_TEMPERATURE = "set_image_temperature",
  SET_IMAGE_TINT = "set_image_tint",
  SET_IMAGE_VIBRANCE = "set_image_vibrance",
  SET_IMAGE_BRIGHTNESS = "set_image_brightness",
  SET_IMAGE_EXPOSURE = "set_image_exposure",
  SET_IMAGE_CONTRAST = "set_image_contract",
  SET_IMAGE_HIGHLIGHT = "set_image_highlight",
  SET_IMAGE_SHADOW = "set_image_shadow",
  APPLY_FILTER = "apply_filter",
  UNAPPLY_FILTER = "unapply_filter",
  UPDATE_SAMPLING = 'update_sampling'
}

export interface WorkerMessage<T = any> {
  type: MessageType;
  data?: T;
}

export function createMessage<T>(
  type: MessageType,
  data?: T
): WorkerMessage<T> {
  return { type, data };
}
