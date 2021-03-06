class Api::EventsController < ApplicationController
  before_action :require_logged_in, only: [:create]

  def create
    @event = Event.new(event_params)
    @event.owner_id = current_user.id

    if @event.save
      render :show
    else
      if (@event.errors.messages.delete :lat) && (@event.errors.messages.delete :lng)
        @event.errors.messages[:location] = ["can't be blank"]
      end
      @event.errors.messages.delete :picture_url if @event.errors.messages[:picture]
        @event.errors.messages[:picture] = ["can't be blank"]
      render json: @event.errors.full_messages, status: 422
    end
  end

  def index
    @events = bounds ? Event.in_bounds(bounds) : Event.all
  end

  def show
    @event = Event.find(params[:id])
  end

  private

  def event_params
    params.require(:event).permit(
      :name,
      :description,
      :lat,
      :lng,
      :picture_url,
      :date
    )
  end

  def bounds
    params[:bounds]
  end
end
