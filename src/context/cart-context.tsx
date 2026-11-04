"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "@/lib/types";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedVariant?: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isBadgeBouncing: boolean;
  animateFlyToCart: (origin: HTMLElement | DOMRect | { x: number; y: number }, imageUrl: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "dapur_rempah_demo_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBadgeBouncing, setIsBadgeBouncing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // LocalStorage unavailable
    }
    setIsLoaded(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // LocalStorage error
    }
  }, [items, isLoaded]);

  const triggerBadgeBounce = () => {
    setIsBadgeBouncing(true);
    setTimeout(() => {
      setIsBadgeBouncing(false);
    }, 450);
  };

  const addItem = (
    product: Product,
    quantity = 1,
    selectedVariant?: string
  ) => {
    const variantKey = selectedVariant || "default";
    const cartItemId = `${product.id}-${variantKey}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedVariant,
          quantity,
        },
      ];
    });

    // Note: Do NOT open cart drawer automatically as per user preference.
    // Flying animation handles feedback, followed by badge bounce.
  };

  const animateFlyToCart = (
    origin: HTMLElement | DOMRect | { x: number; y: number },
    imageUrl: string
  ) => {
    if (typeof window === "undefined") return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      triggerBadgeBounce();
      return;
    }

    // Determine start coordinates
    let startX = window.innerWidth / 2;
    let startY = window.innerHeight / 2;

    if ("x" in origin && "y" in origin && !("left" in origin)) {
      startX = origin.x;
      startY = origin.y;
    } else if (origin instanceof HTMLElement || "left" in origin) {
      const rect =
        origin instanceof HTMLElement
          ? origin.getBoundingClientRect()
          : origin;
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    }

    // Target is ALWAYS the sticky header cart button at the top
    const targetEl = document.getElementById("header-cart-btn");
    const targetRect = targetEl?.getBoundingClientRect();

    const endX = targetRect
      ? targetRect.left + targetRect.width / 2
      : window.innerWidth - 60;
    const endY = targetRect
      ? targetRect.top + targetRect.height / 2
      : 50;

    // Create flying thumbnail clone
    const flyer = document.createElement("div");
    flyer.setAttribute("data-ui", "flying-clone");
    flyer.style.position = "fixed";
    flyer.style.left = "0";
    flyer.style.top = "0";
    flyer.style.width = "54px";
    flyer.style.height = "54px";
    flyer.style.borderRadius = "9999px";
    flyer.style.overflow = "hidden";
    flyer.style.pointerEvents = "none";
    flyer.style.zIndex = "9999";
    flyer.style.border = "2px solid #ffffff";
    flyer.style.boxShadow = "0 8px 24px rgba(33, 21, 16, 0.35)";
    flyer.style.backgroundImage = `url(${imageUrl})`;
    flyer.style.backgroundSize = "cover";
    flyer.style.backgroundPosition = "center";
    flyer.style.backgroundColor = "var(--surface-deep)";

    document.body.appendChild(flyer);

    // Calculate upward arc trajectory towards the header cart
    const dx = endX - startX;
    const dy = endY - startY;

    // Parabolic arc: curve gracefully outward and slightly higher before diving into the header cart
    const apexLift = Math.min(60, Math.max(25, Math.abs(dy) * 0.12));
    const apexY = Math.max(12, Math.min(startY, endY) - apexLift);
    const apexX = startX + dx * 0.42;

    const descentX = startX + dx * 0.78;
    const descentY = startY + dy * 0.72;

    // Animate using Web Animations API with comfortable 920ms pacing
    const animation = flyer.animate(
      [
        {
          transform: `translate(${startX - 27}px, ${startY - 27}px) scale(1)`,
          opacity: 1,
          offset: 0,
        },
        {
          transform: `translate(${apexX - 27}px, ${apexY - 27}px) scale(1.08)`,
          opacity: 1,
          offset: 0.32,
        },
        {
          transform: `translate(${descentX - 27}px, ${descentY - 27}px) scale(0.75)`,
          opacity: 0.95,
          offset: 0.7,
        },
        {
          transform: `translate(${endX - 27}px, ${endY - 27}px) scale(0.3)`,
          opacity: 0.15,
          offset: 1,
        },
      ],
      {
        duration: 920,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      }
    );

    animation.onfinish = () => {
      flyer.remove();
      triggerBadgeBounce();
    };
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.harga * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalCount,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        isBadgeBouncing,
        animateFlyToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
