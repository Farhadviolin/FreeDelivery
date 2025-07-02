package main
import (
  "github.com/kubeedge/kubeedge/cloud/pkg/devicecontroller"
)
func main() {
  controller := devicecontroller.NewController()
  controller.Run()
}
