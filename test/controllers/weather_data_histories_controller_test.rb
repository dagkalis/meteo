require "test_helper"

class WeatherDataHistoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @weather_data_history = weather_data_histories(:one)
  end

  test "should get index" do
    get weather_data_histories_url, as: :json
    assert_response :success
  end

  test "should create weather_data_history" do
    assert_difference('WeatherDataHistory.count') do
      post weather_data_histories_url, params: { weather_data_history: { data: @weather_data_history.data, user_id: @weather_data_history.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show weather_data_history" do
    get weather_data_history_url(@weather_data_history), as: :json
    assert_response :success
  end

  test "should update weather_data_history" do
    patch weather_data_history_url(@weather_data_history), params: { weather_data_history: { data: @weather_data_history.data, user_id: @weather_data_history.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy weather_data_history" do
    assert_difference('WeatherDataHistory.count', -1) do
      delete weather_data_history_url(@weather_data_history), as: :json
    end

    assert_response 204
  end
end
