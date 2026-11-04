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

    // Determine target coordinates (dynamic target)
    // On mobile screens, always prioritize the bottom cart bar (floating-cart-btn)
    const isMobile = window.innerWidth < 640;
    let targetEl: HTMLElement | null = null;

    if (isMobile) {
      targetEl = document.getElementById("floating-cart-btn");
      if (!targetEl) {
        targetEl = document.getElementById("header-cart-btn");
      }
    } else {
      const floatingBtn = document.getElementById("floating-cart-btn");
      const floatingRect = floatingBtn?.getBoundingClientRect();
      const isFloatingVisible =
        floatingBtn &&
        floatingRect &&
        floatingRect.width > 0 &&
        floatingRect.top < window.innerHeight;

      if (window.scrollY >= 120 && isFloatingVisible) {
        targetEl = floatingBtn;
      } else {
        targetEl = document.getElementById("header-cart-btn");
      }
    }

    const targetRect = targetEl?.getBoundingClientRect();
    const endX = targetRect
      ? targetRect.left + targetRect.width / 2
      : isMobile
      ? window.innerWidth / 2
      : window.innerWidth - 60;
    const endY = targetRect
      ? targetRect.top + targetRect.height / 2
      : isMobile
      ? window.innerHeight - 40
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

    // Calculate dynamic arc trajectory
    const dx = endX - startX;
    const dy = endY - startY;
    const isDownward = dy > 0;

    // Apex lift for a natural parabolic toss
    const apexLift = isDownward ? 45 : 70;
    const apexY = Math.min(startY, endY) - apexLift;
    const apexX = startX + dx * 0.35;

    // Intermediate descent point
    const descentX = startX + dx * 0.72;
    const descentY = startY + dy * 0.65;

    // Animate using Web Animations API with comfortable 960ms pacing
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
          offset: 0.3,
        },
        {
          transform: `translate(${descentX - 27}px, ${descentY - 27}px) scale(0.8)`,
          opacity: 0.95,
          offset: 0.68,
        },
        {
          transform: `translate(${endX - 27}px, ${endY - 27}px) scale(0.3)`,
          opacity: 0.15,
          offset: 1,
        },
      ],
      {
        duration: 960,
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
