import { test, expect } from '@playwright/test';

test.describe('Minimapa de Centros Médicos', () => {
  test('debe cargar la página y mostrar el minimapa', async ({ page }) => {
    await page.goto('http://localhost:5173/laboratorio/centrosdeatencion');
    await expect(page.locator('h2.titulo').first()).toContainText(
      'Nuestras Instalaciones'
    );
    await expect(page.locator('.minimapa-container')).toBeVisible();
  });

  test('debe mostrar lista de centros médicos', async ({ page }) => {
    await page.goto('http://localhost:5173/laboratorio/centrosdeatencion');
    await expect(page.locator('.minimapa-card-header')).toContainText(
      'Centros Disponibles'
    );
    const primerCentro = page.locator('.minimapa-centro-item').first();
    await expect(primerCentro).toBeVisible();
  });

  test('debe cargar el mapa de OpenStreetMap', async ({ page }) => {
    await page.goto('http://localhost:5173/laboratorio/centrosdeatencion');
    await page.waitForSelector('.leaflet-container', { timeout: 10000 });
    await expect(page.locator('.leaflet-container')).toBeVisible();
    await expect(page.locator('.leaflet-control-zoom')).toBeVisible();
  });

  test('debe seleccionar un centro al hacer clic', async ({ page }) => {
    await page.goto('http://localhost:5173/laboratorio/centrosdeatencion');
    const primerCentro = page.locator('.minimapa-centro-item').first();
    await primerCentro.click();
    await expect(primerCentro).toHaveClass(/active/);
    await expect(page.locator('.minimapa-selected-centro')).toBeVisible({
      timeout: 10000,
    });
  });

  test('debe geocodificar y mostrar marcador en el mapa', async ({ page }) => {
    await page.goto('http://localhost:5173/laboratorio/centrosdeatencion');
    await page.waitForSelector('.leaflet-container');
    await page.locator('.minimapa-centro-item').first().click();
    await expect(page.locator('.leaflet-marker-icon').first()).toBeVisible({
      timeout: 15000,
    });
  });
});
