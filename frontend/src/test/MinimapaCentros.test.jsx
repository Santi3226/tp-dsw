import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MinimapaCentros from '../components/MinimapaCentros.jsx';

// Dummy del hook useCentros
vi.mock('../hooks/useCentros.js', () => ({
  useCentros: vi.fn(() => ({
    isLoading: false,
    isError: false,
    error: null,
    centros: [
      {
        id: 1,
        nombre: 'Centro Médico Test',
        domicilio: 'Av. Test 123',
        localidad: { denominacion: 'Rosario' },
      },
      {
        id: 2,
        nombre: 'Clínica Test',
        domicilio: 'Calle Test 456',
        localidad: { denominacion: 'Santa Fe' },
      },
    ],
  })),
}));

// Dummy de react-leaflet
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => (
     <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  useMap: () => ({
    setView: vi.fn(),
  }),
}));

// dummy de geocodificación
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ lat: '-32.9468', lon: '-60.6393' }]),
  })
);

//va pickeando uno por uno los componentes y los testea
describe('MinimapaCentros', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar el componente correctamente', () => {
    render(<MinimapaCentros />);

    expect(screen.getByText('Centros Disponibles')).toBeInTheDocument();
  });

  it('debe mostrar la lista de centros', () => {
    render(<MinimapaCentros />);

    expect(screen.getByText(/Centro Médico Test/)).toBeInTheDocument();
    expect(screen.getByText(/Clínica Test/)).toBeInTheDocument();
  });

  it('debe mostrar el contador de centros', () => {
    render(<MinimapaCentros />);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('debe mostrar el mapa', () => {
    render(<MinimapaCentros />);

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  it('debe seleccionar un centro al hacer clic', async () => {
    const user = userEvent.setup();
    render(<MinimapaCentros />);

    const primerCentro = screen
      .getByText(/Centro Médico Test/)
      .closest('.minimapa-centro-item');
    await user.click(primerCentro);

    await waitFor(() => {
      expect(primerCentro).toHaveClass('active');
    });
  });

  it('debe mostrar información del centro seleccionado', async () => {
    const user = userEvent.setup();
    render(<MinimapaCentros />);

    const primerCentro = screen
      .getByText(/Centro Médico Test/)
      .closest('.minimapa-centro-item');
    await user.click(primerCentro);

    await waitFor(() => {
      expect(screen.getByText('Centro Seleccionado')).toBeInTheDocument();
    });
  });
});
