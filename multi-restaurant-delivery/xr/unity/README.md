# Unity AR Foundation Integration

## Export-Workflow

1. Öffne das Unity-Projekt mit AR Foundation (2024.x).
2. Lege deine Szene mit AR Session, AR Session Origin und ARRaycastManager an.
3. Füge das Skript `ARLoader.cs` an ein GameObject mit ARRaycastManager.
4. Exportiere das Modell als glTF/GLB (z.B. mit UnityGLTF-Exporter) oder als USDZ für iOS.
5. Lege exportierte Modelle im Verzeichnis `xr/web/assets/models/` ab.
6. Für native Apps: Implementiere REST-Download der Modelle vom Asset-Server (`/upload-model`-API).

## Beispielskript

```csharp
using UnityEngine;
using UnityEngine.XR.ARFoundation;

public class ARLoader : MonoBehaviour {
  public GameObject modelPrefab;
  private ARRaycastManager raycastManager;
  void Start() {
    raycastManager = GetComponent<ARRaycastManager>();
  }
  void Update() {
    if (Input.touchCount > 0) {
      var touch = Input.GetTouch(0);
      if (touch.phase == TouchPhase.Began) {
        var hits = new List<ARRaycastHit>();
        raycastManager.Raycast(touch.position, hits);
        if (hits.Count > 0) {
          Instantiate(modelPrefab, hits[0].pose.position, hits[0].pose.rotation);
        }
      }
    }
  }
}
```

## Hinweise
- Für ARKit/ARCore: Siehe Unity AR Foundation Docs
- Für WebXR: Modelle als glTF/GLB bereitstellen
- Für Analytics: Events per REST an `/xr-event` senden
