import {
  faFolder,
  faCamera,
  faPalette,
  faFileAlt,
  faFont,
  faCube,
  faIcons,
  faImage,
  faTag,
  faShapes,
  faObjectGroup,
  faPaintBrush,
  faPencilRuler,
  faLayerGroup,
  faStar,
  faSearch,
} from "@fortawesome/free-solid-svg-icons"

const ICON_MAP: Record<string, unknown> = {
  faFolder,
  faCamera,
  faPalette,
  faFileAlt,
  faFont,
  faCube,
  faIcons,
  faImage,
  faTag,
  faShapes,
  faObjectGroup,
  faPaintBrush,
  faPencilRuler,
  faLayerGroup,
  faStar,
  faSearch,
}

export function getIconDefinition(iconName: string) {
  return (ICON_MAP[iconName] as ReturnType<typeof faFolder>) || faFolder
}

export const FA_ICON_MAP: Record<string, string> = {
  faFolder: "Folder",
  faCamera: "Camera",
  faPalette: "Palette",
  faFileAlt: "File",
  faFont: "Font",
  faCube: "3D Cube",
  faIcons: "Icons",
  faImage: "Image",
  faTag: "Tag",
  faShapes: "Shapes",
  faObjectGroup: "Vector",
  faPaintBrush: "Paint Brush",
  faPencilRuler: "Pencil Ruler",
  faLayerGroup: "Layers",
  faStar: "Star",
  faSearch: "Search",
}

export const FA_ICON_OPTIONS = Object.keys(FA_ICON_MAP)
