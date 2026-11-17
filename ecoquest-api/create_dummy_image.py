from PIL import Image
img = Image.new('RGB', (1024, 1024), color = (73, 109, 137))
img.save('test_image.jpg')
