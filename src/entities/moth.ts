export type Moth = {
  id: string;
  type: string;
  location: string;
  description: string;
  imageUrl: string;
};
export type MothCreateDto = {
  type: string;
  location: string;
  description: string;
  imageUrl: string;
};

export type MothUpdateDto = {
  type?: string;
  location?: string;
  description?: string;
  imageUrl: string;
};
