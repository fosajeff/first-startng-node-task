# fosajeff

print("Hello there! I can help you calculate the area of a circle.\n")

PI = 3.14159

try:
    radius = float(input("Enter the radius of the circle(in meters): "))
    area = 2 * PI * radius

except Exception:
    print("Please enter a valid number")

else:
    print(f"The area of a circle of radius {radius} is {round(area, 3)} square meters")
