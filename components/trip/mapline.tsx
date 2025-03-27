import React, { useEffect, useRef } from "react";
import{ useMap } from "react-map-gl/mapbox";

interface PolylineOverlayProps {
    points: [number, number][]; // Array of [longitude, latitude] coordinates
    color?: string;
    lineWidth?: number;
}

const PolylineOverlay: React.FC<PolylineOverlayProps> = ({
    points,
    color = "blue",
    lineWidth = 2,
}) => {
    const { current: map } = useMap();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!map || points.length === 0) return;

        const drawPolyline = () => {
            if (!map || points.length === 0) return;

            const canvas = document.createElement("canvas");
            canvas.width = map.getCanvas().width;
            canvas.height = map.getCanvas().height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.globalCompositeOperation = "lighter";
            ctx.beginPath();

            points.forEach(([lng, lat], index) => {
                const pixel = map.project([lng, lat]);
                if (index === 0) ctx.moveTo(pixel.x, pixel.y);
                else ctx.lineTo(pixel.x, pixel.y);
            });

            ctx.stroke();
            canvasRef.current = canvas;

            const bounds = map.getBounds();
            if (!bounds) return;

            const topLeft: [number, number] = [bounds.getWest(), bounds.getNorth()];
            const topRight: [number, number] = [bounds.getEast(), bounds.getNorth()];
            const bottomRight: [number, number] = [bounds.getEast(), bounds.getSouth()];
            const bottomLeft: [number, number] = [bounds.getWest(), bounds.getSouth()];

            const mapSource = map.getSource("polyline-canvas") as mapboxgl.ImageSource;
            if (mapSource) {
                mapSource.setCoordinates([topLeft, topRight, bottomRight, bottomLeft]);
                mapSource.updateImage({ url: canvas.toDataURL() });
            } else {
                map.getMap().addSource("polyline-canvas", {
                    type: "image",
                    url: canvas.toDataURL(),
                    coordinates: [topLeft, topRight, bottomRight, bottomLeft],
                });

                map.getMap().addLayer({
                    id: "polyline-layer",
                    type: "raster",
                    source: "polyline-canvas",
                    paint: {},  
                });
            }
        };
        // Ensure the style is loaded before proceeding
        if (!map.isStyleLoaded()) {
            map.once("styledata", () => drawPolyline());
            return;
        }
        drawPolyline();

        return () => {
            if (map.getLayer("polyline-layer")) {
                map.getMap().removeLayer("polyline-layer");
                map.getMap().removeSource("polyline-canvas");
            }
        };
    }, [map, points, color, lineWidth]);

    return null;
};

export default PolylineOverlay;
