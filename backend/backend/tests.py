from django.test import TestCase
from .models import Data
from .calculations import (
  get_data_by_name, calculate_transportation, calculate_housing,
  calculate_space, calculate_coffee, calculate_food,
  calculate_bandwidth, calculate_devices, calculate_recording, calculate_expression
)

""" Run tests: python manage.py test """

"""
----------------------
models.py unit tests
----------------------
"""
class DataTestCase(TestCase):
  def setUp(self):
    # Create a test instance of Data
    self.data = Data.objects.create(
      name="Test name",
      expression="x + y",
      parameters="x,y",
      description="Test description"
    )

  def test_string_representation(self):
    # Test that the str() method works
    self.assertEqual(str(self.data), self.data.name)

  def test_data_creation(self):
    # Test that the Data instance is created correctly
    self.assertEqual(self.data.name, "Test name")
    self.assertEqual(self.data.expression, "x + y")
    self.assertEqual(self.data.parameters, "x,y")
    self.assertEqual(self.data.description, "Test description")


"""
----------------------
views.py unit tests
----------------------
"""

"""
class TestRootView(TestCase):
  # Test that root_view returns OK status
  def test_root_view(self):
    response = self.client.get(reverse('root_view'))
    self.assertEqual(response.status_code, 200)
    self.assertJSONEqual(response.content.decode('utf-8'), {'status': "OK"})
"""


"""
----------------------
calculations.py unit tests
----------------------
"""
class TestCalculations(TestCase):
  def test_get_data_by_name_valid(self):
    data = get_data_by_name('Transportation B')
    # Check that the formula is found in db
    self.assertIsNotNone(data, 'Failed to find formula \'Transportation B\' from database.')
    self.assertEqual(data.name, 'Transportation B')

  def test_get_data_by_name_invalid(self):
    data = get_data_by_name('Invalid name')
    self.assertIsNone(data)


  def test_calculate_transportation(self):
    args = [100, 40, 50, 40, 10, 10, 463, 10, 1000]
    result = calculate_transportation(args)
    expected_result = 100 * (40 * 0.184 * 50 + 40 * 0.0649 * 10 + 10 * 0.5709 * 463 + 10 * 0.297 * 1000)
    self.assertAlmostEqual(result, expected_result, places=1)

  def test_calculate_housing(self):
    args = [100, 2]
    result = calculate_housing(args)
    expected_result = 100 * 2 * 121.36 * 0.5
    self.assertAlmostEqual(result, expected_result, places=1)

  def test_calculate_space(self):
    args = [50, 8]
    result = calculate_space(args)
    expected_result = 50 * 8 * 0.00466
    self.assertAlmostEqual(result, expected_result, places=1)

  def test_calculate_coffee(self):
    args = [2, 100]
    result = calculate_coffee(args)
    expected_result = 2 * 100 * 0.2 * 0.9
    self.assertAlmostEqual(result, expected_result, places=1)

  def test_calculate_food(self):
    args = [2, 80, 20]
    result = calculate_food(args)
    expected_result = 2 * (80 * 2.1725 + 20 * 0.9025)
    self.assertAlmostEqual(result, expected_result, places=1)

  def test_calculate_bandwidth(self):
    args = [100, 8]
    result = calculate_bandwidth(args)
    expected_result = 100 * 8 * 0.5546
    self.assertAlmostEqual(result, expected_result, places=1)

  def test_calculate_devices(self):
    args = [100, 8]
    result = calculate_devices(args)
    expected_result = 100 * 8 * 0.116539
    self.assertAlmostEqual(result, expected_result, places=1)

  def test_calculate_recording(self):
    args = [720, 8]
    result = calculate_recording(args)
    expected_result = 0.00002854 * 720 * 8 * 0.4
    self.assertAlmostEqual(result, expected_result, places=1)

  def test_calculate_expression_too_many_arguments(self):
    name = "Housing"
    args = [20]
    with self.assertRaises(ValueError) as error:
      calculate_expression(name, args)
    self.assertEqual(
      str(error.exception),
      "Expected 2 arguments, but got 1."
    )