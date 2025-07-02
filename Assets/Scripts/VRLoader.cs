using UnityEngine;
using UnityEngine.Networking;

public class VRLoader : MonoBehaviour {
  public string restaurantId = "r1";
  void Start() {
    StartCoroutine(LoadTexture());
  }
  IEnumerator LoadTexture() {
    var request = UnityWebRequestTexture.GetTexture($"https://cdn.delivery.com/{restaurantId}/360/pano.jpg");
    yield return request.SendWebRequest();
    var tex = DownloadHandlerTexture.GetContent(request);
    var sphere = GameObject.CreatePrimitive(PrimitiveType.Sphere);
    var mat = new Material(Shader.Find("Standard")) { mainTexture = tex };
    sphere.GetComponent<Renderer>().material = mat;
    sphere.transform.localScale = new Vector3(-500,500,500);
  }
}
