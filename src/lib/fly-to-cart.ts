const FLY_DURATION_MS = 700;

/**
 * Animates a thumbnail from a source element to the cart count badge,
 * then triggers a bump on #cart-count.
 */
export function flyToCart(
  sourceEl: HTMLElement | null,
  imageUrl?: string | null
): void {
  if (typeof document === 'undefined' || !sourceEl) return;

  const cartTarget =
    document.getElementById('cart-count') ??
    document.getElementById('cart-icon');
  if (!cartTarget) return;

  const from = sourceEl.getBoundingClientRect();
  const to = cartTarget.getBoundingClientRect();

  const fly = document.createElement('div');
  fly.className = 'fly-item';
  fly.setAttribute('aria-hidden', 'true');

  const size = Math.min(72, Math.max(40, from.width * 0.35));
  const startX = from.left + from.width / 2 - size / 2;
  const startY = from.top + from.height / 2 - size / 2;
  const endX = to.left + to.width / 2 - size / 2;
  const endY = to.top + to.height / 2 - size / 2;

  fly.style.width = `${size}px`;
  fly.style.height = `${size}px`;
  fly.style.left = `${startX}px`;
  fly.style.top = `${startY}px`;
  fly.style.setProperty('--fly-dx', `${endX - startX}px`);
  fly.style.setProperty('--fly-dy', `${endY - startY}px`);
  fly.style.animationDuration = `${FLY_DURATION_MS}ms`;

  if (imageUrl) {
    fly.style.backgroundImage = `url(${imageUrl})`;
  }

  document.body.appendChild(fly);

  window.setTimeout(() => {
    fly.remove();
    bumpCartCount();
  }, FLY_DURATION_MS);
}

function bumpCartCount(): void {
  const count = document.getElementById('cart-count');
  if (!count) return;
  count.classList.remove('is-bump');
  // Force reflow so the animation can restart
  void count.offsetWidth;
  count.classList.add('is-bump');
  const onEnd = () => {
    count.classList.remove('is-bump');
    count.removeEventListener('animationend', onEnd);
  };
  count.addEventListener('animationend', onEnd);
}
