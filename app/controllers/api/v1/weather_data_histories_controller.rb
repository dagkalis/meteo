class Api::V1::WeatherDataHistoriesController < ApplicationController
  before_action :set_weather_data_history, only: [:show, :update, :destroy]

  # GET /weather_data_histories
  def index
    @weather_data_histories = WeatherDataHistory.select(WeatherDataHistory.column_names - ['data'])
                                                .where(user_id: current_user.id)

    render json: @weather_data_histories
  end

  # GET /weather_data_histories/1
  def show
    render json: @weather_data_history
  end

  # POST /weather_data_histories
  def create
    @weather_data_history = WeatherDataHistory.new(weather_data_history_params)

    result = nil
    Rails.logger.silence do
      result = @weather_data_history.save
    end

    Log.d 'INSERT INTO WEATHER_DATA_HISTORIES...'

    if result
      render json: @weather_data_history, status: :created#, location: @weather_data_history
    else
      render json: @weather_data_history.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /weather_data_histories/1
  def update
    if @weather_data_history.update(weather_data_history_params)
      render json: @weather_data_history
    else
      render json: @weather_data_history.errors, status: :unprocessable_entity
    end
  end

  # DELETE /weather_data_histories/1
  def destroy
    @weather_data_history.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_weather_data_history
      @weather_data_history = WeatherDataHistory.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def weather_data_history_params
      params.require(:weather_data_history).permit(:data).merge(user_id: current_user.id)
    end
end
