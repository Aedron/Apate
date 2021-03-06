import "./index.scss";
import * as React from "react";
import { Maybe } from "types";
import { globalEvent, GlobalEventType, loadImage } from "utils";
import { observer } from "mobx-react";
import { cropStore, imageStore, mainStore } from "../../state";
import { getCanvasSizeAndPosition } from "./utils";

const containerWidth = window.innerWidth - 300 - 1;

@observer
export class Canvas extends React.Component {
  private containerRef: Maybe<HTMLDivElement> = null;

  private ref: Maybe<HTMLCanvasElement> = null;

  private ctx: Maybe<CanvasRenderingContext2D> = null;

  private maxSize = {
    width: 0,
    height: 0
  };

  public async componentDidMount() {
    window.addEventListener("resize", this.setMaxSize);

    this.setMaxSize();
    this.drawImage();

    globalEvent.on(GlobalEventType.UPDATE_IMAGE, this.drawImage);
  }

  public componentWillUnmount(): void {
    window.removeEventListener("resize", this.setMaxSize);
  }

  private setMaxSize = () => {
    const { clientWidth, clientHeight } = this.containerRef!;
    this.maxSize = {
      width: clientWidth,
      height: clientHeight
    };
  };

  private drawImage = async () => {
    const image = await loadImage(mainStore.imageSrc!);
    const { naturalWidth, naturalHeight } = image;
    const { width, height } = getCanvasSizeAndPosition(
      this.maxSize.width,
      this.maxSize.height,
      naturalWidth,
      naturalHeight
    );
    mainStore.setCanvasSize(width, height);
    this.ctx!.drawImage(image, 0, 0, width, height);
    imageStore.initImageData();
  };

  private setContainerRef = (i: HTMLDivElement) => (this.containerRef = i);

  private setRefAndCtx = (i: HTMLCanvasElement) => {
    this.ref = i;
    if (i) {
      this.ctx = i.getContext("2d");
      mainStore.setCanvasContext(this.ctx!);
    }
  };

  private get style() {
    const { width, height } = mainStore;
    const { rotate, flipX, flipY } = cropStore;

    let scaleX = flipX ? -1 : 1;
    let scaleY = flipY ? -1 : 1;

    if (rotate % 180 !== 0) {
      const [h, w] = [width, height];
      const { width: maxW } = getCanvasSizeAndPosition(
        this.maxSize.width,
        this.maxSize.height,
        w,
        h
      );
      const scale = w / maxW;
      scaleX /= scale;
      scaleY /= scale;
    }

    return {
      width,
      height,
      transform: `rotate(${rotate}deg) scaleX(${scaleX}) scaleY(${scaleY})`
    };
  }

  public render() {
    const { width, height } = mainStore;

    return (
      <div
        id="main-canvas-container"
        ref={this.setContainerRef}
        style={{ width: containerWidth }}
      >
        <canvas
          style={this.style}
          id="main-canvas"
          ref={this.setRefAndCtx}
          width={width}
          height={height}
        >
          你的浏览器不支持canvas
        </canvas>
      </div>
    );
  }
}
