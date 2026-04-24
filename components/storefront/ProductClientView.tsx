"use client";

import { useState } from "react";
import Image from "next/image";

type Variant = {
  id: string;
  size: string;
  color: string;
  stockQuantity: number;
};

type Product = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  images: string[];
  variants: Variant[];
};

export default function ProductClientView({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState(product.images[0]);

  // Extract unique colors and sizes
  const uniqueColors = Array.from(new Set(product.variants.map((v) => v.color)));
  const uniqueSizes = Array.from(new Set(product.variants.map((v) => v.size)));

  // Check if a specific size is in stock for the selected color (or any color if none selected)
  const isSizeInStock = (size: string) => {
    if (selectedColor) {
      const variant = product.variants.find(
        (v) => v.size === size && v.color === selectedColor
      );
      return variant ? variant.stockQuantity > 0 : false;
    }
    // If no color selected, check if it's available in any color
    return product.variants.some((v) => v.size === size && v.stockQuantity > 0);
  };

  // Check if a specific color is in stock for the selected size
  const isColorInStock = (color: string) => {
    if (selectedSize) {
      const variant = product.variants.find(
        (v) => v.color === color && v.size === selectedSize
      );
      return variant ? variant.stockQuantity > 0 : false;
    }
    return product.variants.some((v) => v.color === color && v.stockQuantity > 0);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    // Reset size if the previously selected size is not available in the new color
    if (selectedSize) {
      const variant = product.variants.find(
        (v) => v.size === selectedSize && v.color === color
      );
      if (!variant || variant.stockQuantity <= 0) {
        setSelectedSize(null);
      }
    }
  };

  const handleSizeSelect = (size: string) => {
    if (isSizeInStock(size)) {
      setSelectedSize(size);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;
    const variant = product.variants.find(
      (v) => v.size === selectedSize && v.color === selectedColor
    );
    if (!variant || variant.stockQuantity <= 0) return;

    // TODO: integrate with actual cart state/context
    alert(`Added to cart: ${product.name} (${selectedSize}, ${selectedColor})`);
  };

  const isAddToCartDisabled = !selectedColor || !selectedSize;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      {/* Gallery (Left) */}
      <div className="lg:col-span-7 flex flex-col md:flex-row gap-6 h-full">
        {/* Thumbnails */}
        <div className="hidden md:flex flex-col gap-4 w-24 flex-shrink-0">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`w-full aspect-[3/4] bg-surface-container overflow-hidden cursor-pointer transition-opacity ${
                mainImage === img ? "border border-outline-variant" : "opacity-50 hover:opacity-100"
              }`}
            >
              <img
                alt={`Thumbnail ${idx}`}
                className="w-full h-full object-cover mix-blend-multiply"
                src={img}
              />
            </button>
          ))}
        </div>
        {/* Main Image */}
        <div className="w-full bg-surface-container-low aspect-[3/4] lg:aspect-auto lg:h-[800px] overflow-hidden">
          <img
            alt={product.name}
            className="w-full h-full object-cover object-center mix-blend-multiply"
            src={mainImage}
          />
        </div>
      </div>

      {/* Product Details (Right) */}
      <div className="lg:col-span-4 lg:col-start-9 flex flex-col pt-8 lg:pt-0">
        <h1 className="font-headline-lg text-headline-lg text-on-background mb-4">
          {product.name}
        </h1>
        <p className="font-body-lg text-body-lg text-on-background mb-10">
          ETB {product.basePrice.toLocaleString()}
        </p>

        {/* Color Selection */}
        <div className="mb-10">
          <span className="block font-label-sm text-label-sm text-outline uppercase mb-4">
            Color
          </span>
          <div className="flex gap-3">
            {uniqueColors.map((color) => {
              const inStock = isColorInStock(color);
              const isSelected = selectedColor === color;
              return (
                <button
                  key={color}
                  onClick={() => inStock && handleColorSelect(color)}
                  disabled={!inStock}
                  className={`px-6 py-2 rounded-full font-body-md text-body-md transition-colors ${
                    isSelected
                      ? "border border-primary bg-primary text-on-primary"
                      : inStock
                      ? "border border-outline-variant bg-surface-container-lowest text-on-background hover:bg-surface-container"
                      : "border border-outline-variant opacity-30 cursor-not-allowed text-on-background"
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <span className="block font-label-sm text-label-sm text-outline uppercase">
              Size
            </span>
            <button className="font-label-sm text-label-sm text-outline underline underline-offset-4 hover:text-on-background transition-colors uppercase">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {uniqueSizes.map((size) => {
              const inStock = isSizeInStock(size);
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  disabled={!inStock}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-body-md text-body-md transition-colors ${
                    isSelected
                      ? "border border-primary bg-primary text-on-primary"
                      : inStock
                      ? "border border-outline-variant bg-surface-container-lowest text-on-background hover:bg-surface-container"
                      : "border border-outline-variant opacity-30 cursor-not-allowed text-on-background relative overflow-hidden after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-outline-variant after:rotate-45"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={isAddToCartDisabled}
          className={`w-full py-5 rounded-lg font-body-lg text-body-lg uppercase tracking-wider mb-10 flex items-center justify-center gap-3 transition-opacity ${
            isAddToCartDisabled
              ? "bg-surface-dim text-on-surface-variant opacity-50 cursor-not-allowed"
              : "bg-primary text-on-primary hover:opacity-90"
          }`}
        >
          Add to Cart
        </button>

        {/* Description */}
        <div className="border-t border-outline-variant pt-6">
          <h3 className="font-label-sm text-label-sm text-on-background uppercase mb-4">
            Description
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant text-opacity-80 leading-relaxed mb-6">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
