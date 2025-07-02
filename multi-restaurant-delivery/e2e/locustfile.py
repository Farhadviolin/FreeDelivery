from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def get_restaurants(self):
        self.client.get("/api/restaurants")

    @task
    def get_menu(self):
        self.client.get("/api/menus/1")

    @task
    def homepage(self):
        self.client.get("/")
