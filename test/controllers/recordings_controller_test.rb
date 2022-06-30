require "test_helper"

class RecordingsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get recordings_index_url
    assert_response :success
  end

  test "should get create" do
    get recordings_create_url
    assert_response :success
  end

  test "should get destroy" do
    get recordings_destroy_url
    assert_response :success
  end
end
