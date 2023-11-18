import { action, makeObservable, observable } from "mobx";
import { nanoid } from "nanoid";

export interface VectorParams {
  x: number;
  y: number;
}

export class Vector {
  x: number;
  y: number;

  constructor(params: VectorParams) {
    this.x = params.x;
    this.y = params.y;
    makeObservable(this, {
      x: observable,
      y: observable,
    });
  }

  distanceTo(other: Vector) {
    return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
  }

  clone() {
    return new Vector({ x: this.x, y: this.y });
  }
}

export interface ItemParams {
  width: number;
  height: number;
  center: Vector;
}

export class Item {
  id: string;
  center: Vector;
  width: number;
  height: number;

  constructor(params: ItemParams) {
    this.id = nanoid();
    this.center = params.center;
    this.width = params.width;
    this.height = params.height;
  }

  getQuadrant(point: Vector) {
    const vertical = point.y > this.center.y ? "bottom" : "top";
    const horizontal = point.x > this.center.x ? "right" : "left";
    return `${vertical}-${horizontal}`;
  }
}

export interface GridParams {
  width: number;
  height: number;
}

export class Grid {
  id: string;
  cameraPosition: Vector;
  items: Item[];
  width: number;
  height: number;

  constructor({ width, height }: GridParams) {
    this.id = nanoid();
    this.width = width;
    this.height = height;
    this.cameraPosition = new Vector({ x: 0, y: 0 });
    this.items = [
      new Item({
        width,
        height,
        center: new Vector({ x: 0, y: 0 }),
      }),
      new Item({
        width,
        height,
        center: new Vector({ x: width, y: 0 }),
      }),
      new Item({
        width,
        height,
        center: new Vector({ x: 0, y: height }),
      }),
      new Item({
        width,
        height,
        center: new Vector({ x: width, y: height }),
      }),
    ];
    makeObservable(this, {
      cameraPosition: observable,
      setCameraPosition: action,
    });
  }

  setCameraPosition(position: Vector) {
    this.cameraPosition = position;
    const closestItem = this.getClosestItem();
    const quadrant = closestItem.getQuadrant(this.cameraPosition);
    const anchor = closestItem.center.clone();
    if (quadrant === "top-right") {
      this.items[0].center.x = anchor.x;
      this.items[0].center.y = anchor.y;
      this.items[1].center.x = anchor.x;
      this.items[1].center.y = anchor.y - this.height;
      this.items[2].center.x = anchor.x + this.width;
      this.items[2].center.y = anchor.y - this.height;
      this.items[3].center.x = anchor.x + this.width;
      this.items[3].center.y = anchor.y;
    }
    if (quadrant === "top-left") {
      this.items[0].center.x = anchor.x;
      this.items[0].center.y = anchor.y;
      this.items[1].center.x = anchor.x;
      this.items[1].center.y = anchor.y - this.height;
      this.items[2].center.x = anchor.x - this.width;
      this.items[2].center.y = anchor.y - this.height;
      this.items[3].center.x = anchor.x - this.width;
      this.items[3].center.y = anchor.y;
    }
    if (quadrant === "bottom-left") {
      this.items[0].center.x = anchor.x;
      this.items[0].center.y = anchor.y;
      this.items[1].center.x = anchor.x;
      this.items[1].center.y = anchor.y + this.height;
      this.items[2].center.x = anchor.x - this.width;
      this.items[2].center.y = anchor.y + this.height;
      this.items[3].center.x = anchor.x - this.width;
      this.items[3].center.y = anchor.y;
    }
    if (quadrant === "bottom-right") {
      this.items[0].center.x = anchor.x;
      this.items[0].center.y = anchor.y;
      this.items[1].center.x = anchor.x;
      this.items[1].center.y = anchor.y + this.height;
      this.items[2].center.x = anchor.x + this.width;
      this.items[2].center.y = anchor.y + this.height;
      this.items[3].center.x = anchor.x + this.width;
      this.items[3].center.y = anchor.y;
    }
  }

  getClosestItem() {
    let minDistance = Infinity;
    let closestItem: Item = null;
    this.items.forEach((item) => {
      const distance = item.center.distanceTo(this.cameraPosition);
      if (distance < minDistance) {
        minDistance = distance;
        closestItem = item;
      }
    });
    return closestItem!;
  }
}
